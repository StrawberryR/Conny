import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import EmotionTracker from './components/EmotionTracker';
import ThoughtRecord from './components/ThoughtRecord';
import Analytics from './components/Analytics';
import Resources from './components/Resources';
import PatientsManagement from './components/Psychologist/PatientsManagement';
import AdminDashboard from './components/Admin/AdminDashboard';
import Login from './components/Auth/Login';
import { Emotion, ThoughtRecord as ThoughtRecordType, ViewType, User } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [thoughtRecords, setThoughtRecords] = useState<ThoughtRecordType[]>([]);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('cony-app-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  // Load user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Only load emotion/thought data for patients
      if (user.role === 'patient' || !user.role) {
        const savedEmotions = localStorage.getItem(`cony-app-emotions-${user.id}`);
        const savedThoughts = localStorage.getItem(`cony-app-thoughts-${user.id}`);

        if (savedEmotions) {
          setEmotions(JSON.parse(savedEmotions));
        } else {
          // Add sample data for demo
          const sampleEmotions: Emotion[] = [
            {
              id: '1',
              name: 'Felicidad',
              intensity: 8,
              date: new Date().toISOString().split('T')[0],
              note: 'Terminé un proyecto importante en el trabajo',
              triggers: ['Trabajo']
            },
            {
              id: '2',
              name: 'Ansiedad',
              intensity: 6,
              date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
              note: 'Presentación importante mañana',
              triggers: ['Trabajo', 'Futuro']
            },
            {
              id: '3',
              name: 'Calma',
              intensity: 7,
              date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
              note: 'Sesión de meditación matutina',
              triggers: ['Autocuidado']
            }
          ];
          setEmotions(sampleEmotions);
        }

        if (savedThoughts) {
          setThoughtRecords(JSON.parse(savedThoughts));
        }
      }
    }
  }, [isAuthenticated, user]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user && (user.role === 'patient' || !user.role)) {
      localStorage.setItem(`cony-app-emotions-${user.id}`, JSON.stringify(emotions));
    }
  }, [emotions, user]);

  useEffect(() => {
    if (user && (user.role === 'patient' || !user.role)) {
      localStorage.setItem(`cony-app-thoughts-${user.id}`, JSON.stringify(thoughtRecords));
    }
  }, [thoughtRecords, user]);

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication with role detection
    let role: 'patient' | 'psychologist' | 'admin' = 'patient';
    
    if (email.includes('psicologo') || email.includes('dr.') || email.includes('psychologist')) {
      role = 'psychologist';
    } else if (email.includes('admin')) {
      role = 'admin';
    }

    const userData: User = {
      id: email === 'demo@conyapp.com' ? 'demo-user' : Date.now().toString(),
      email,
      name: email === 'demo@conyapp.com' ? 'Usuario Demo' : email.split('@')[0],
      role,
      registrationDate: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('cony-app-user', JSON.stringify(userData));
  };

  const handleRegister = (email: string, password: string, name: string) => {
    // Simulate registration with role detection
    let role: 'patient' | 'psychologist' | 'admin' = 'patient';
    
    if (email.includes('psicologo') || email.includes('dr.') || email.includes('psychologist')) {
      role = 'psychologist';
    } else if (email.includes('admin')) {
      role = 'admin';
    }

    const userData: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      registrationDate: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('cony-app-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setEmotions([]);
    setThoughtRecords([]);
    setCurrentView('dashboard');
    localStorage.removeItem('cony-app-user');
  };

  const addEmotion = (emotion: Omit<Emotion, 'id'>) => {
    const newEmotion: Emotion = {
      ...emotion,
      id: Date.now().toString()
    };
    setEmotions(prev => [newEmotion, ...prev]);
  };

  const deleteEmotion = (id: string) => {
    setEmotions(prev => prev.filter(emotion => emotion.id !== id));
  };

  const addThoughtRecord = (thought: Omit<ThoughtRecordType, 'id'>) => {
    const newThought: ThoughtRecordType = {
      ...thought,
      id: Date.now().toString()
    };
    setThoughtRecords(prev => [newThought, ...prev]);
  };

  const deleteThoughtRecord = (id: string) => {
    setThoughtRecords(prev => prev.filter(thought => thought.id !== id));
  };

  const renderCurrentView = () => {
    if (!user) return null;

    switch (currentView) {
      case 'dashboard':
        if (user.role === 'admin') {
          return <AdminDashboard currentUser={user} />;
        }
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={user} />;
      
      case 'emotions':
        if (user.role === 'patient' || !user.role) {
          return (
            <EmotionTracker
              emotions={emotions}
              onAddEmotion={addEmotion}
              onDeleteEmotion={deleteEmotion}
            />
          );
        }
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={user} />;
      
      case 'thoughts':
        if (user.role === 'patient' || !user.role) {
          return (
            <ThoughtRecord
              thoughtRecords={thoughtRecords}
              onAddThought={addThoughtRecord}
              onDeleteThought={deleteThoughtRecord}
            />
          );
        }
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={user} />;
      
      case 'analytics':
        return <Analytics emotions={emotions} thoughtRecords={thoughtRecords} />;
      
      case 'resources':
        return <Resources />;
      
      case 'patients':
      case 'users':
        if (user.role === 'psychologist' || user.role === 'admin') {
          return <PatientsManagement currentUser={user} />;
        }
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={user} />;
      
      case 'admin':
        if (user.role === 'admin') {
          return <AdminDashboard currentUser={user} />;
        }
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={user} />;
      
      default:
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={user} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        user={user!}
        onLogout={handleLogout}
      />
      <main className="pb-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;