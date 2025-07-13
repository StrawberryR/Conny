import React from 'react';
import { TrendingUp, Calendar, Brain, Heart, Target, Clock, Sparkles, Flame, Award, Star } from 'lucide-react';
import { Emotion, ThoughtRecord, User } from '../types';

interface DashboardProps {
  emotions: Emotion[];
  thoughtRecords: ThoughtRecord[];
  user: User;
}

export default function Dashboard({ emotions, thoughtRecords, user }: DashboardProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayEmotions = emotions.filter(e => e.date === today);
  const recentThoughts = thoughtRecords.slice(-3);
  
  const avgMood = emotions.length > 0 
    ? emotions.reduce((sum, e) => sum + e.intensity, 0) / emotions.length 
    : 0;

  // Calcular rachas
  const calculateStreaks = () => {
    const sortedDates = [...new Set(emotions.map(e => e.date))].sort();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    if (sortedDates.length === 0) return { current: 0, longest: 0 };
    
    // Verificar si hoy tiene registros
    const hasToday = sortedDates.includes(today);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    // Calcular racha actual
    let checkDate = new Date();
    let streakActive = hasToday;
    
    if (streakActive) {
      currentStreak = 1;
      checkDate.setDate(checkDate.getDate() - 1);
      
      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (sortedDates.includes(dateStr)) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    } else if (sortedDates.includes(yesterdayStr)) {
      // Si no registró hoy pero sí ayer, la racha se rompió
      currentStreak = 0;
    }
    
    // Calcular racha más larga
    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(sortedDates[i - 1]);
        const currDate = new Date(sortedDates[i]);
        const diffTime = currDate.getTime() - prevDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);
    
    return { current: currentStreak, longest: longestStreak };
  };

  const streaks = calculateStreaks();
  
  // Calcular racha de TCC
  const calculateTCCStreak = () => {
    const tccDates = [...new Set(thoughtRecords.map(t => t.date))].sort();
    if (tccDates.length === 0) return 0;
    
    let streak = 0;
    const hasToday = tccDates.includes(today);
    
    if (hasToday) {
      streak = 1;
      let checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - 1);
      
      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (tccDates.includes(dateStr)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }
    
    return streak;
  };

  const tccStreak = calculateTCCStreak();

  const getMoodColor = (intensity: number) => {
    if (intensity >= 8) return 'text-green-600 bg-green-100';
    if (intensity >= 6) return 'text-yellow-600 bg-yellow-100';
    if (intensity >= 4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días';
    if (hour < 18) return '¡Buenas tardes';
    return '¡Buenas noches';
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "¡Comienza tu racha hoy!";
    if (streak === 1) return "¡Buen comienzo!";
    if (streak < 7) return "¡Vas muy bien!";
    if (streak < 30) return "¡Increíble constancia!";
    return "¡Eres una leyenda!";
  };

  const getStreakEmoji = (streak: number) => {
    if (streak === 0) return "🌱";
    if (streak < 3) return "🔥";
    if (streak < 7) return "🚀";
    if (streak < 30) return "⭐";
    return "👑";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getGreeting()}, {user.name}! 👋
        </h1>
        <p className="text-gray-600">¿Cómo te sientes hoy? Aquí tienes un resumen de tu bienestar emocional.</p>
      </div>

      {/* Streak Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Tu Racha de Bienestar</h2>
                <p className="text-gray-600 text-sm">Mantén el impulso registrando tus emociones diariamente</p>
              </div>
            </div>
            <div className="text-4xl">{getStreakEmoji(streaks.current)}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Racha Actual */}
            <div className="bg-white rounded-xl p-6 border border-orange-200 hover:shadow-md transition-shadow duration-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Flame className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-1">{streaks.current}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">Días Consecutivos</div>
                <div className="text-xs text-gray-600">{getStreakMessage(streaks.current)}</div>
              </div>
            </div>

            {/* Mejor Racha */}
            <div className="bg-white rounded-xl p-6 border border-yellow-200 hover:shadow-md transition-shadow duration-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-1">{streaks.longest}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">Mejor Racha</div>
                <div className="text-xs text-gray-600">Tu récord personal</div>
              </div>
            </div>

            {/* Racha TCC */}
            <div className="bg-white rounded-xl p-6 border border-purple-200 hover:shadow-md transition-shadow duration-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-1">{tccStreak}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">Días TCC</div>
                <div className="text-xs text-gray-600">Sesiones consecutivas</div>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="mt-6 bg-white rounded-xl p-4 border border-orange-200">
            <div className="flex items-center space-x-3">
              <Star className="w-5 h-5 text-orange-500" />
              <div>
                {streaks.current === 0 ? (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">¡Comienza tu racha hoy!</span> Registra cómo te sientes para comenzar tu camino hacia el bienestar constante.
                  </p>
                ) : streaks.current === 1 ? (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">¡Excelente comienzo!</span> Has dado el primer paso. Continúa mañana para construir tu racha.
                  </p>
                ) : streaks.current < 7 ? (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">¡Vas por buen camino!</span> Llevas {streaks.current} días consecutivos. ¡Solo faltan {7 - streaks.current} días para completar tu primera semana!
                  </p>
                ) : streaks.current < 30 ? (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">¡Increíble constancia!</span> {streaks.current} días seguidos es impresionante. ¡Estás construyendo un hábito sólido!
                  </p>
                ) : (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">¡Eres una leyenda del bienestar!</span> {streaks.current} días consecutivos es extraordinario. ¡Eres un ejemplo a seguir!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Estado de Ánimo Promedio</p>
              <p className="text-2xl font-bold text-gray-900">{avgMood.toFixed(1)}/10</p>
            </div>
            <div className={`p-3 rounded-lg ${getMoodColor(avgMood)}`}>
              <Heart className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Registros Hoy</p>
              <p className="text-2xl font-bold text-gray-900">{todayEmotions.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pensamientos TCC</p>
              <p className="text-2xl font-bold text-gray-900">{thoughtRecords.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <Brain className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Días Activos</p>
              <p className="text-2xl font-bold text-gray-900">{new Set(emotions.map(e => e.date)).size}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Emotion Check */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            Check-in Rápido
          </h3>
          <p className="text-gray-600 mb-4">¿Cómo te sientes en este momento?</p>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                className="p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-center group"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">
                  {level === 1 ? '😢' : level === 2 ? '😕' : level === 3 ? '😐' : level === 4 ? '🙂' : '😊'}
                </div>
                <span className="text-xs text-gray-600">{level}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Thoughts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-500" />
            Pensamientos Recientes
          </h3>
          <div className="space-y-3">
            {recentThoughts.length > 0 ? recentThoughts.map((thought) => (
              <div key={thought.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <p className="text-sm text-gray-800 font-medium">{thought.situation}</p>
                <p className="text-xs text-gray-600 mt-1">{new Date(thought.date).toLocaleDateString()}</p>
              </div>
            )) : (
              <p className="text-gray-500 text-sm">No hay registros de pensamientos aún.</p>
            )}
          </div>
        </div>
      </div>

      {/* Daily Goals */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Objetivos Diarios de Bienestar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:shadow-sm transition-shadow duration-200">
            <div className={`w-4 h-4 border-2 rounded mr-3 ${todayEmotions.length >= 3 ? 'bg-green-500 border-green-500' : 'border-blue-500'}`}>
              {todayEmotions.length >= 3 && <span className="text-white text-xs">✓</span>}
            </div>
            <span className="text-sm text-gray-700">Registrar emociones 3 veces ({todayEmotions.length}/3)</span>
          </div>
          <div className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:shadow-sm transition-shadow duration-200">
            <div className={`w-4 h-4 border-2 rounded mr-3 ${tccStreak > 0 ? 'bg-green-500 border-green-500' : 'border-blue-500'}`}>
              {tccStreak > 0 && <span className="text-white text-xs">✓</span>}
            </div>
            <span className="text-sm text-gray-700">Completar un ejercicio de TCC</span>
          </div>
          <div className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:shadow-sm transition-shadow duration-200">
            <div className="w-4 h-4 border-2 border-blue-500 rounded mr-3"></div>
            <span className="text-sm text-gray-700">5 minutos de mindfulness</span>
          </div>
        </div>
      </div>

      {/* Welcome Message for New Users */}
      {emotions.length === 0 && thoughtRecords.length === 0 && (
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Bienvenido a Cony App!</h3>
            <p className="text-gray-600 mb-6">
              Estás a punto de comenzar un viaje increíble hacia el bienestar emocional. 
              Comienza registrando cómo te sientes hoy y construye tu primera racha.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium">
                Registrar Primera Emoción
              </button>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors duration-200 font-medium">
                Explorar Recursos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}