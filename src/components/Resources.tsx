import React, { useState } from 'react';
import { BookOpen, PlayCircle, Heart, Brain, Target, Clock, Star } from 'lucide-react';

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('techniques');

  const categories = [
    { id: 'techniques', label: 'Técnicas TCC', icon: Brain },
    { id: 'exercises', label: 'Ejercicios', icon: Target },
    { id: 'mindfulness', label: 'Mindfulness', icon: Heart },
    { id: 'education', label: 'Educación', icon: BookOpen },
  ];

  const resources = {
    techniques: [
      {
        title: 'Registro de Pensamientos Automáticos',
        description: 'Aprende a identificar y cuestionar tus pensamientos automáticos negativos.',
        content: [
          '1. Identifica el pensamiento automático',
          '2. Evalúa la evidencia a favor y en contra',
          '3. Desarrolla un pensamiento más equilibrado',
          '4. Observa cómo cambia tu estado emocional'
        ],
        time: '10-15 min',
        difficulty: 'Intermedio'
      },
      {
        title: 'Reestructuración Cognitiva',
        description: 'Técnica fundamental para cambiar patrones de pensamiento disfuncionales.',
        content: [
          '1. Reconoce los patrones de pensamiento negativos',
          '2. Desafía estos pensamientos con preguntas específicas',
          '3. Encuentra alternativas más realistas y útiles',
          '4. Practica el nuevo patrón de pensamiento'
        ],
        time: '15-20 min',
        difficulty: 'Avanzado'
      },
      {
        title: 'Técnica de Detención del Pensamiento',
        description: 'Interrumpe los ciclos de pensamientos rumiativos y negativos.',
        content: [
          '1. Reconoce cuando tienes pensamientos negativos repetitivos',
          '2. Di "STOP" mentalmente o en voz alta',
          '3. Toma tres respiraciones profundas',
          '4. Redirige tu atención a algo positivo o neutral'
        ],
        time: '2-5 min',
        difficulty: 'Principiante'
      }
    ],
    exercises: [
      {
        title: 'Ejercicio de Respiración 4-7-8',
        description: 'Técnica de respiración para reducir la ansiedad y el estrés.',
        content: [
          '1. Inhala por la nariz durante 4 segundos',
          '2. Mantén la respiración durante 7 segundos',
          '3. Exhala por la boca durante 8 segundos',
          '4. Repite el ciclo 4 veces'
        ],
        time: '5 min',
        difficulty: 'Principiante'
      },
      {
        title: 'Relajación Muscular Progresiva',
        description: 'Libera la tensión física y mental a través de la relajación muscular.',
        content: [
          '1. Encuentra una posición cómoda',
          '2. Tensa cada grupo muscular durante 5 segundos',
          '3. Relaja súbitamente y nota la diferencia',
          '4. Continúa desde los pies hasta la cabeza'
        ],
        time: '15-20 min',
        difficulty: 'Intermedio'
      },
      {
        title: 'Diario de Gratitud',
        description: 'Cultiva una perspectiva positiva y mejora tu bienestar emocional.',
        content: [
          '1. Cada noche, escribe 3 cosas por las que estás agradecido',
          '2. Sé específico en tus descripciones',
          '3. Incluye por qué estás agradecido por cada cosa',
          '4. Lee tus entradas anteriores regularmente'
        ],
        time: '5-10 min',
        difficulty: 'Principiante'
      }
    ],
    mindfulness: [
      {
        title: 'Meditación de Atención Plena',
        description: 'Practica la conciencia del momento presente sin juicio.',
        content: [
          '1. Siéntate cómodamente con los ojos cerrados',
          '2. Enfócate en tu respiración natural',
          '3. Cuando tu mente divague, vuelve gentilmente a la respiración',
          '4. Observa tus pensamientos sin juzgarlos'
        ],
        time: '10-20 min',
        difficulty: 'Intermedio'
      },
      {
        title: 'Escaneo Corporal',
        description: 'Desarrolla conciencia corporal y libera tensiones.',
        content: [
          '1. Acuéstate cómodamente',
          '2. Comienza enfocándote en los dedos de los pies',
          '3. Mueve lentamente tu atención hacia arriba',
          '4. Nota sensaciones sin intentar cambiarlas'
        ],
        time: '15-30 min',
        difficulty: 'Principiante'
      },
      {
        title: 'Mindfulness en Actividades Cotidianas',
        description: 'Incorpora la atención plena en tu rutina diaria.',
        content: [
          '1. Elige una actividad rutinaria (comer, caminar, lavarse)',
          '2. Enfócate completamente en las sensaciones',
          '3. Nota los detalles que normalmente ignoras',
          '4. Cuando tu mente divague, vuelve a la actividad'
        ],
        time: '5-15 min',
        difficulty: 'Principiante'
      }
    ],
    education: [
      {
        title: 'Fundamentos de la TCC',
        description: 'Comprende los principios básicos de la terapia cognitivo-conductual.',
        content: [
          'La TCC se basa en la idea de que nuestros pensamientos, emociones y comportamientos están interconectados.',
          'Cambiando patrones de pensamiento negativos, podemos mejorar nuestro estado emocional.',
          'La TCC es una terapia estructurada, orientada a objetivos y basada en evidencia.',
          'Se enfoca en problemas actuales más que en el pasado.'
        ],
        time: '10 min lectura',
        difficulty: 'Principiante'
      },
      {
        title: 'Distorsiones Cognitivas Comunes',
        description: 'Identifica patrones de pensamiento problemáticos.',
        content: [
          'Pensamiento todo o nada: Ver las cosas en términos absolutos',
          'Filtro mental: Enfocarse solo en los aspectos negativos',
          'Catastrofización: Imaginar los peores escenarios posibles',
          'Lectura de mente: Asumir que sabes lo que otros piensan'
        ],
        time: '15 min lectura',
        difficulty: 'Intermedio'
      },
      {
        title: 'El Triángulo TCC',
        description: 'Entiende la relación entre pensamientos, emociones y comportamientos.',
        content: [
          'Los pensamientos influyen en cómo nos sentimos',
          'Las emociones afectan nuestro comportamiento',
          'Los comportamientos pueden reforzar o cambiar nuestros pensamientos',
          'Cambiar cualquier elemento puede afectar a los otros dos'
        ],
        time: '8 min lectura',
        difficulty: 'Principiante'
      }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recursos de Bienestar</h1>
        <p className="text-gray-600">Explora técnicas, ejercicios y contenido educativo para mejorar tu salud mental.</p>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources[activeCategory as keyof typeof resources].map((resource, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">4.8</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">{resource.time}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {resource.content.map((step, stepIndex) => (
                <div key={stepIndex} className="text-sm text-gray-700 flex items-start">
                  {typeof step === 'string' && step.match(/^\d+\./) ? (
                    <span>{step}</span>
                  ) : (
                    <span>• {step}</span>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <PlayCircle className="w-4 h-4" />
              <span>Comenzar</span>
            </button>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-blue-600" />
          Consejos Rápidos para el Bienestar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-2">💧 Mantén la Hidratación</h4>
            <p className="text-sm text-gray-600">Bebe al menos 8 vasos de agua al día para mantener tu cerebro funcionando óptimamente.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-2">🌅 Rutina Matutina</h4>
            <p className="text-sm text-gray-600">Establece una rutina matutina que incluya tiempo para ti mismo y actividades que disfrutes.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-2">📱 Límites Digitales</h4>
            <p className="text-sm text-gray-600">Establece horarios libres de dispositivos, especialmente antes de dormir.</p>
          </div>
        </div>
      </div>
    </div>
  );
}