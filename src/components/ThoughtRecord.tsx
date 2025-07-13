import React, { useState } from 'react';
import { Plus, Brain, Lightbulb, Trash2 } from 'lucide-react';
import { ThoughtRecord } from '../types';

interface ThoughtRecordProps {
  thoughtRecords: ThoughtRecord[];
  onAddThought: (thought: Omit<ThoughtRecord, 'id'>) => void;
  onDeleteThought: (id: string) => void;
}

export default function ThoughtRecordComponent({ thoughtRecords, onAddThought, onDeleteThought }: ThoughtRecordProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [step, setStep] = useState(1);
  const [newThought, setNewThought] = useState({
    date: new Date().toISOString().split('T')[0],
    situation: '',
    automaticThought: '',
    emotion: '',
    emotionIntensity: 5,
    evidence: '',
    alternativeThought: '',
    newEmotionIntensity: 5
  });

  const handleSubmit = () => {
    onAddThought(newThought);
    setNewThought({
      date: new Date().toISOString().split('T')[0],
      situation: '',
      automaticThought: '',
      emotion: '',
      emotionIntensity: 5,
      evidence: '',
      alternativeThought: '',
      newEmotionIntensity: 5
    });
    setIsAdding(false);
    setStep(1);
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Paso 1: Identifica la Situación</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">¿Qué estaba pasando?</label>
              <textarea
                value={newThought.situation}
                onChange={(e) => setNewThought({ ...newThought, situation: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Describe la situación específica que desencadenó tus pensamientos..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <input
                type="date"
                value={newThought.date}
                onChange={(e) => setNewThought({ ...newThought, date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Paso 2: Pensamientos y Emociones</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">¿Qué pensamiento automático tuviste?</label>
              <textarea
                value={newThought.automaticThought}
                onChange={(e) => setNewThought({ ...newThought, automaticThought: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="El primer pensamiento que vino a tu mente..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">¿Qué emoción sentiste?</label>
              <input
                type="text"
                value={newThought.emotion}
                onChange={(e) => setNewThought({ ...newThought, emotion: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej. ansiedad, tristeza, ira..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intensidad de la emoción: {newThought.emotionIntensity}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={newThought.emotionIntensity}
                onChange={(e) => setNewThought({ ...newThought, emotionIntensity: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Paso 3: Examina la Evidencia</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Qué evidencia tienes a favor y en contra de este pensamiento?
              </label>
              <textarea
                value={newThought.evidence}
                onChange={(e) => setNewThought({ ...newThought, evidence: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="A favor: ... En contra: ..."
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">💡 Preguntas útiles:</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• ¿Es este pensamiento realista?</li>
                <li>• ¿Qué le diría a un amigo en esta situación?</li>
                <li>• ¿Hay otra forma de ver esto?</li>
                <li>• ¿Cuál es la evidencia real?</li>
              </ul>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Paso 4: Pensamiento Alternativo</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Basándote en la evidencia, ¿cuál sería un pensamiento más equilibrado?
              </label>
              <textarea
                value={newThought.alternativeThought}
                onChange={(e) => setNewThought({ ...newThought, alternativeThought: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Un pensamiento más realista y equilibrado..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cómo te sientes ahora? {newThought.newEmotionIntensity}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={newThought.newEmotionIntensity}
                onChange={(e) => setNewThought({ ...newThought, newEmotionIntensity: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro de Pensamientos</h1>
          <p className="text-gray-600">Utiliza la terapia cognitivo conductual para reestructurar pensamientos negativos.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Registro</span>
        </button>
      </div>

      {/* Add Thought Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Registro de Pensamientos TCC</h3>
              <div className="text-sm text-gray-500">Paso {step} de 4</div>
            </div>

            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {renderStep()}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  if (step === 1) {
                    setIsAdding(false);
                    setStep(1);
                  } else {
                    prevStep();
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                {step === 1 ? 'Cancelar' : 'Anterior'}
              </button>
              <button
                onClick={step === 4 ? handleSubmit : nextStep}
                disabled={
                  (step === 1 && !newThought.situation) ||
                  (step === 2 && (!newThought.automaticThought || !newThought.emotion)) ||
                  (step === 3 && !newThought.evidence) ||
                  (step === 4 && !newThought.alternativeThought)
                }
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {step === 4 ? 'Completar' : 'Siguiente'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thought Records List */}
      <div className="space-y-6">
        {thoughtRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{record.situation}</h3>
                  <p className="text-sm text-gray-600">{new Date(record.date).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={() => onDeleteThought(record.id)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Pensamiento Automático</h4>
                  <p className="text-sm text-gray-700 bg-red-50 p-3 rounded-lg">{record.automaticThought}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-600">{record.emotion}</span>
                    <span className="text-xs font-medium text-red-600">{record.emotionIntensity}/10</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Evidencia</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{record.evidence}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
                  <h4 className="font-medium text-gray-900">Pensamiento Alternativo</h4>
                </div>
                <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg mb-2">{record.alternativeThought}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Nueva intensidad emocional</span>
                  <span className="text-xs font-medium text-green-600">{record.newEmotionIntensity}/10</span>
                </div>
                {record.emotionIntensity > record.newEmotionIntensity && (
                  <div className="mt-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                    ✨ Mejora de {record.emotionIntensity - record.newEmotionIntensity} puntos
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {thoughtRecords.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🧠</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay registros de pensamientos</h3>
          <p className="text-gray-600 mb-6">
            Comienza registrando tus pensamientos automáticos para aprender a reestructurarlos.
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Primer Registro TCC
          </button>
        </div>
      )}
    </div>
  );
}