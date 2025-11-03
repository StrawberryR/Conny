/*
  # Esquema inicial para Cony App

  1. Nuevas Tablas
    - `profiles` - Perfiles de usuario extendidos
    - `emotions` - Registro de emociones
    - `thought_records` - Registros de pensamientos TCC
    - `stripe_customers` - Clientes de Stripe
    - `stripe_subscriptions` - Suscripciones de Stripe
    - `stripe_orders` - Órdenes de Stripe

  2. Seguridad
    - Habilitar RLS en todas las tablas
    - Políticas para usuarios autenticados
    - Vistas seguras para datos de Stripe
*/

-- Crear tabla de perfiles extendidos
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  avatar_url text,
  role text DEFAULT 'patient' CHECK (role IN ('patient', 'psychologist', 'admin')),
  assigned_psychologist uuid REFERENCES profiles(id),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
  treatment_start_date timestamptz,
  registration_date timestamptz DEFAULT now(),
  last_activity timestamptz DEFAULT now(),
  risk_level text DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high')),
  notes text,
  license text, -- Para psicólogos
  specialization text[], -- Para psicólogos
  max_patients integer DEFAULT 20, -- Para psicólogos
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de emociones
CREATE TABLE IF NOT EXISTS emotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  intensity integer NOT NULL CHECK (intensity >= 1 AND intensity <= 10),
  date date NOT NULL DEFAULT CURRENT_DATE,
  note text,
  triggers text[],
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de registros de pensamientos
CREATE TABLE IF NOT EXISTS thought_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  situation text NOT NULL,
  automatic_thought text NOT NULL,
  emotion text NOT NULL,
  emotion_intensity integer NOT NULL CHECK (emotion_intensity >= 1 AND emotion_intensity <= 10),
  evidence text NOT NULL,
  alternative_thought text NOT NULL,
  new_emotion_intensity integer NOT NULL CHECK (new_emotion_intensity >= 1 AND new_emotion_intensity <= 10),
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de clientes de Stripe
CREATE TABLE IF NOT EXISTS stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  stripe_customer_id text UNIQUE NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de suscripciones de Stripe
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id text UNIQUE NOT NULL,
  stripe_customer_id text NOT NULL,
  status text NOT NULL,
  price_id text NOT NULL,
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  canceled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de órdenes de Stripe
CREATE TABLE IF NOT EXISTS stripe_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id text UNIQUE NOT NULL,
  stripe_customer_id text NOT NULL,
  amount integer NOT NULL,
  currency text NOT NULL DEFAULT 'usd',
  status text NOT NULL,
  product_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE emotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE thought_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_orders ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Psychologists can read assigned patients"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id OR 
    assigned_psychologist = auth.uid() OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Políticas para emotions
CREATE POLICY "Users can manage own emotions"
  ON emotions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Psychologists can read patient emotions"
  ON emotions
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = emotions.user_id 
      AND assigned_psychologist = auth.uid()
    )
  );

-- Políticas para thought_records
CREATE POLICY "Users can manage own thought records"
  ON thought_records
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Psychologists can read patient thoughts"
  ON thought_records
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = thought_records.user_id 
      AND assigned_psychologist = auth.uid()
    )
  );

-- Políticas para stripe_customers
CREATE POLICY "Users can read own stripe customer data"
  ON stripe_customers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Políticas para stripe_subscriptions
CREATE POLICY "Users can read own subscriptions"
  ON stripe_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Políticas para stripe_orders
CREATE POLICY "Users can read own orders"
  ON stripe_orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Crear vistas seguras para datos de Stripe
CREATE OR REPLACE VIEW stripe_user_subscriptions AS
SELECT 
  s.*,
  p.name as user_name,
  p.email as user_email
FROM stripe_subscriptions s
JOIN profiles p ON s.user_id = p.id
WHERE s.user_id = auth.uid();

CREATE OR REPLACE VIEW stripe_user_orders AS
SELECT 
  o.*,
  p.name as user_name,
  p.email as user_email
FROM stripe_orders o
JOIN profiles p ON o.user_id = p.id
WHERE o.user_id = auth.uid();

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stripe_customers_updated_at 
  BEFORE UPDATE ON stripe_customers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stripe_subscriptions_updated_at 
  BEFORE UPDATE ON stripe_subscriptions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stripe_orders_updated_at 
  BEFORE UPDATE ON stripe_orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_assigned_psychologist ON profiles(assigned_psychologist);
CREATE INDEX IF NOT EXISTS idx_emotions_user_id ON emotions(user_id);
CREATE INDEX IF NOT EXISTS idx_emotions_date ON emotions(date);
CREATE INDEX IF NOT EXISTS idx_thought_records_user_id ON thought_records(user_id);
CREATE INDEX IF NOT EXISTS idx_thought_records_date ON thought_records(date);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_user_id ON stripe_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_user_id ON stripe_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_orders_user_id ON stripe_orders(user_id);