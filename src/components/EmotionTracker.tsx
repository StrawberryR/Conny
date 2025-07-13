import React, { useState } from 'react';
import { Plus, Calendar, TrendingUp, Trash2 } from 'lucide-react';
import { Emotion } from '../types';

interface EmotionTrackerProps {
  emotions: Emotion[];
  onAddEmotion: (emotion: Omit<Emotion, 'id'>) => void;
  onDeleteEmotion: (id: string) => void;
}

export default function EmotionTracker({ emotions, onAddEmotion, onDeleteEmotion }: EmotionTrackerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEmotion, setNewEmotion] = useState({
    name: '',
    intensity: 5,
    date: new Date().toISOString().split('T')[0],
    note: '',
    triggers: [] as string[]
  });

  const emotionOptions = [
    'Felicidad', 'Tristeza', 'Ansiedad', 'Ira', 'Miedo', 'Calma', 
    'Estrés', 'Esperanza', 'Frustración', 'Gratitud', 'Soledad', 'Energía'
  ];

  const triggerOptions = [
    'Trabajo', 'Familia', 'Relaciones', 'Salud', 'Dinero', 'Social',
    'Estudios', 'Futuro', 'Pasado', 'Cambios', 'Decisiones', 'Otro'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmotion.name) {
      onAddEmotion(newEmotion);
      setNewEmotion({
        name: '',
        intensity: 5,
        date: new Date().toISOString().split('T')[0],
        note: '',
        triggers: []
      });
      setIsAdding(false);
    }
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 8) return 'bg-green-500';
    if (intensity >= 6) return 'bg-yellow-500';
    if (intensity >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seguimiento Emocional</h1>
          <p className="text-gray-600">Registra y monitorea tus emociones diarias para identificar patrones.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Emoción</span>
        </button>
      </div>

      {/* Add Emotion Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Registrar Nueva Emoción</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emoción</label>
                <select
                  value={newEmotion.name}
                  onChange={(e) => setNewEmotion({ ...newEmotion, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona una emoción</option>
                  {emotionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intensidad: {newEmotion.intensity}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newEmotion.intensity}
                  onChange={(e) => setNewEmotion({ ...newEmotion, intensity: Number(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Muy bajo</span>
                  <span>Muy alto</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                <input
                  type="date"
                  value={newEmotion.date}
                  onChange={(e) => setNewEmotion({ ...newEmotion, date: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas (opcional)</label>
                <textarea
                  value={newEmotion.note}
                  onChange={(e) => setNewEmotion({ ...newEmotion, note: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="¿Qué desencadenó esta emoción?"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Emotions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emotions.map((emotion) => (
          <div key={emotion.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getEmotionEmoji(emotion.name)}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{emotion.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(emotion.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDeleteEmotion(emotion.id)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Intensidad</span>
                <span className="text-sm font-bold text-gray-900">{emotion.intensity}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getIntensityColor(emotion.intensity)}`}
                  style={{ width: `${emotion.intensity * 10}%` }}
                />
              </div>
            </div>

            {emotion.note && (
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{emotion.note}</p>
            )}
          </div>
        ))}
      </div>

      {emotions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay emociones registradas</h3>
          <p className="text-gray-600 mb-6">Comienza registrando cómo te sientes para comenzar a identificar patrones.</p>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Registrar Primera Emoción
          </button>
        </div>
      )}
    </div>
  );
}