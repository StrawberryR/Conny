import React from 'react';
import { TrendingUp, Calendar, BarChart3, Target } from 'lucide-react';
import { Emotion, ThoughtRecord } from '../types';

interface AnalyticsProps {
  emotions: Emotion[];
  thoughtRecords: ThoughtRecord[];
}

export default function Analytics({ emotions, thoughtRecords }: AnalyticsProps) {
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const emotionsByDay = last7Days.map(date => {
    const dayEmotions = emotions.filter(e => e.date === date);
    const avg = dayEmotions.length > 0 
      ? dayEmotions.reduce((sum, e) => sum + e.intensity, 0) / dayEmotions.length 
      : 0;
    return { date, avg, count: dayEmotions.length };
  });

  const topEmotions = emotions.reduce((acc, emotion) => {
    acc[emotion.name] = (acc[emotion.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topEmotionsList = Object.entries(topEmotions)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const thoughtImprovement = thoughtRecords.map(record => ({
    date: record.date,
    improvement: record.emotionIntensity - record.newEmotionIntensity
  }));

  const avgImprovement = thoughtImprovement.length > 0
    ? thoughtImprovement.reduce((sum, t) => sum + t.improvement, 0) / thoughtImprovement.length
    : 0;

  const getEmotionEmoji = (emotion: string) => {
    const emojiMap: { [key: string]: string } = {
      'Felicidad': '😊', 'Tristeza': '😢', 'Ansiedad': '😰', 'Ira': '😠',
      'Miedo': '😨', 'Calma': '😌', 'Estrés': '😓', 'Esperanza': '🌟',
      'Frustración': '😤', 'Gratitud': '🙏', 'Soledad': '😔', 'Energía': '⚡'
    };
    return emojiMap[emotion] || '😐';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Análisis y Tendencias</h1>
        <p className="text-gray-600">Visualiza tu progreso emocional y patrones de pensamiento.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mejora Promedio TCC</p>
              <p className="text-2xl font-bold text-green-600">+{avgImprovement.toFixed(1)}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Días Activos</p>
              <p className="text-2xl font-bold text-blue-600">{new Set(emotions.map(e => e.date)).size}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Registros Totales</p>
              <p className="text-2xl font-bold text-purple-600">{emotions.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sesiones TCC</p>
              <p className="text-2xl font-bold text-orange-600">{thoughtRecords.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
              <Target className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencia del Estado de Ánimo (7 días)</h3>
          <div className="space-y-3">
            {emotionsByDay.map((day) => (
              <div key={day.date} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-16">
                    {new Date(day.date).toLocaleDateString('es-ES', { weekday: 'short' })}
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-2 flex-1 max-w-xs">
                    <div
                      className={`h-2 rounded-full ${
                        day.avg >= 7 ? 'bg-green-500' :
                        day.avg >= 5 ? 'bg-yellow-500' :
                        day.avg >= 3 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${day.avg * 10}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{day.avg.toFixed(1)}</div>
                  <div className="text-xs text-gray-500">{day.count} reg.</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Emotions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emociones Más Frecuentes</h3>
          <div className="space-y-3">
            {topEmotionsList.map(([emotion, count], index) => (
              <div key={emotion} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getEmotionEmoji(emotion)}</span>
                  <span className="text-sm font-medium text-gray-900">{emotion}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ 
                        width: `${(count / Math.max(...topEmotionsList.map(([,c]) => c))) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TCC Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso en TCC</h3>
          {thoughtRecords.length > 0 ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">+{avgImprovement.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Mejora promedio por sesión</div>
              </div>
              <div className="space-y-2">
                {thoughtRecords.slice(-5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-600">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-red-600">{record.emotionIntensity}</span>
                      <span className="text-xs text-gray-400">→</span>
                      <span className="text-xs text-green-600">{record.newEmotionIntensity}</span>
                      <span className="text-xs font-medium text-green-600">
                        (+{record.emotionIntensity - record.newEmotionIntensity})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-sm">No hay datos de TCC disponibles</p>
            </div>
          )}
        </div>

        {/* Weekly Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen Semanal</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Registros esta semana</span>
              <span className="font-medium text-blue-600">
                {emotions.filter(e => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(e.date) >= weekAgo;
                }).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Sesiones TCC</span>
              <span className="font-medium text-purple-600">
                {thoughtRecords.filter(t => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(t.date) >= weekAgo;
                }).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Estado promedio</span>
              <span className="font-medium text-green-600">
                {emotionsByDay.reduce((sum, day) => sum + day.avg, 0) / 7 || 0}/10
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}