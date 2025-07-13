import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Plus, Eye, MessageCircle, AlertTriangle, TrendingUp, Calendar, Brain } from 'lucide-react';
import { Patient, Emotion, ThoughtRecord, User } from '../../types';

interface PatientsManagementProps {
  currentUser: User;
}

export default function PatientsManagement({ currentUser }: PatientsManagementProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientDetail, setShowPatientDetail] = useState(false);

  // Mock data - En producción vendría de la API
  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        id: '1',
        email: 'maria.garcia@email.com',
        name: 'María García',
        role: 'patient',
        assignedPsychologist: currentUser.id,
        status: 'active',
        treatmentStartDate: '2024-01-15',
        registrationDate: '2024-01-15',
        lastActivity: '2024-01-20',
        riskLevel: 'medium',
        notes: 'Paciente con ansiedad generalizada. Progreso positivo en las últimas sesiones.'
      },
      {
        id: '2',
        email: 'carlos.lopez@email.com',
        name: 'Carlos López',
        role: 'patient',
        assignedPsychologist: currentUser.id,
        status: 'active',
        treatmentStartDate: '2024-01-10',
        registrationDate: '2024-01-10',
        lastActivity: '2024-01-19',
        riskLevel: 'low',
        notes: 'Depresión leve. Respondiendo bien a la TCC.'
      },
      {
        id: '3',
        email: 'ana.martinez@email.com',
        name: 'Ana Martínez',
        role: 'patient',
        assignedPsychologist: currentUser.id,
        status: 'active',
        treatmentStartDate: '2024-01-05',
        registrationDate: '2024-01-05',
        lastActivity: '2024-01-18',
        riskLevel: 'high',
        notes: 'Requiere seguimiento cercano. Episodios de pánico frecuentes.'
      }
    ];
    setPatients(mockPatients);
  }, [currentUser.id]);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    const matchesRisk = filterRisk === 'all' || patient.riskLevel === filterRisk;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const PatientDetailModal = ({ patient }: { patient: Patient }) => {
    // Mock data para el paciente seleccionado
    const mockEmotions: Emotion[] = [
      { id: '1', name: 'Ansiedad', intensity: 7, date: '2024-01-20', note: 'Reunión importante' },
      { id: '2', name: 'Calma', intensity: 6, date: '2024-01-19', note: 'Después de meditación' },
    ];

    const mockThoughts: ThoughtRecord[] = [
      {
        id: '1',
        date: '2024-01-20',
        situation: 'Presentación en el trabajo',
        automaticThought: 'Voy a fallar y todos se darán cuenta',
        emotion: 'Ansiedad',
        emotionIntensity: 8,
        evidence: 'He hecho presentaciones antes con éxito',
        alternativeThought: 'Estoy preparado y puedo manejar cualquier pregunta',
        newEmotionIntensity: 5
      }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                <p className="text-gray-600">{patient.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status === 'active' ? 'Activo' : patient.status === 'inactive' ? 'Inactivo' : 'Completado'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(patient.riskLevel)}`}>
                    Riesgo {patient.riskLevel === 'high' ? 'Alto' : patient.riskLevel === 'medium' ? 'Medio' : 'Bajo'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowPatientDetail(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Días en tratamiento</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {Math.floor((new Date().getTime() - new Date(patient.treatmentStartDate).getTime()) / (1000 * 60 * 60 * 24))}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Registros emocionales</p>
                    <p className="text-2xl font-bold text-purple-900">{mockEmotions.length}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Sesiones TCC</p>
                    <p className="text-2xl font-bold text-green-900">{mockThoughts.length}</p>
                  </div>
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emociones Recientes</h3>
                <div className="space-y-3">
                  {mockEmotions.map(emotion => (
                    <div key={emotion.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{emotion.name}</span>
                        <span className="text-sm text-gray-600">{emotion.intensity}/10</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{emotion.note}</p>
                      <p className="text-xs text-gray-500">{new Date(emotion.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Registros TCC</h3>
                <div className="space-y-3">
                  {mockThoughts.map(thought => (
                    <div key={thought.id} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-900 text-sm">{thought.situation}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-red-600">Antes: {thought.emotionIntensity}/10</span>
                        <span className="text-xs text-green-600">Después: {thought.newEmotionIntensity}/10</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{new Date(thought.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {patient.notes && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Notas del Terapeuta</h3>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-gray-700">{patient.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Pacientes</h1>
        <p className="text-gray-600">Administra y monitorea el progreso de tus pacientes.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pacientes</p>
              <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pacientes Activos</p>
              <p className="text-2xl font-bold text-green-600">
                {patients.filter(p => p.status === 'active').length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Riesgo Alto</p>
              <p className="text-2xl font-bold text-red-600">
                {patients.filter(p => p.riskLevel === 'high').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completados</p>
              <p className="text-2xl font-bold text-blue-600">
                {patients.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar pacientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="completed">Completados</option>
            </select>

            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los riesgos</option>
              <option value="low">Riesgo Bajo</option>
              <option value="medium">Riesgo Medio</option>
              <option value="high">Riesgo Alto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Riesgo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Actividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status === 'active' ? 'Activo' : patient.status === 'inactive' ? 'Inactivo' : 'Completado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getRiskColor(patient.riskLevel)}`}>
                      {patient.riskLevel === 'high' ? 'Alto' : patient.riskLevel === 'medium' ? 'Medio' : 'Bajo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.lastActivity ? new Date(patient.lastActivity).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedPatient(patient);
                          setShowPatientDetail(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Enviar mensaje"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron pacientes</h3>
          <p className="text-gray-600">Ajusta los filtros de búsqueda para ver más resultados.</p>
        </div>
      )}

      {/* Patient Detail Modal */}
      {showPatientDetail && selectedPatient && (
        <PatientDetailModal patient={selectedPatient} />
      )}
    </div>
  );
}