import React, { useState, useEffect } from 'react';
import { Users, UserCheck, AlertTriangle, TrendingUp, BarChart3, Settings, Shield, Database, Plus, Search, Filter, Eye, Edit, Trash2, UserPlus, Award, Calendar, Brain, Heart, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { AdminStats, User, Patient, Psychologist } from '../../types';

interface AdminDashboardProps {
  currentUser: User;
}

export default function AdminDashboard({ currentUser }: AdminDashboardProps) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'psychologists' | 'patients' | 'settings'>('overview');
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedItem, setSelectedItem] = useState<Patient | Psychologist | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - En producción vendría de la API
  useEffect(() => {
    const mockStats: AdminStats = {
      totalUsers: 156,
      totalPsychologists: 12,
      totalPatients: 144,
      activeUsers: 89,
      totalEmotions: 2340,
      totalThoughts: 567,
      averageMood: 6.8,
      riskDistribution: {
        low: 89,
        medium: 45,
        high: 10
      }
    };

    const mockPsychologists: Psychologist[] = [
      {
        id: 'psy1',
        email: 'dr.martinez@conyapp.com',
        name: 'Dr. Ana Martínez',
        role: 'psychologist',
        license: 'PSY-2024-001',
        specialization: ['Ansiedad', 'Depresión', 'TCC'],
        patients: ['pat1', 'pat2', 'pat3'],
        maxPatients: 20,
        registrationDate: '2024-01-01',
        lastActivity: '2024-01-20'
      },
      {
        id: 'psy2',
        email: 'dr.rodriguez@conyapp.com',
        name: 'Dr. Carlos Rodríguez',
        role: 'psychologist',
        license: 'PSY-2024-002',
        specialization: ['Trauma', 'EMDR', 'Terapia Familiar'],
        patients: ['pat4', 'pat5'],
        maxPatients: 15,
        registrationDate: '2024-01-05',
        lastActivity: '2024-01-19'
      },
      {
        id: 'psy3',
        email: 'dr.lopez@conyapp.com',
        name: 'Dra. María López',
        role: 'psychologist',
        license: 'PSY-2024-003',
        specialization: ['Adolescentes', 'Trastornos Alimentarios'],
        patients: ['pat6'],
        maxPatients: 18,
        registrationDate: '2024-01-10',
        lastActivity: '2024-01-18'
      }
    ];

    const mockPatients: Patient[] = [
      {
        id: 'pat1',
        email: 'maria.garcia@email.com',
        name: 'María García',
        role: 'patient',
        assignedPsychologist: 'psy1',
        status: 'active',
        treatmentStartDate: '2024-01-15',
        registrationDate: '2024-01-15',
        lastActivity: '2024-01-20',
        riskLevel: 'medium',
        notes: 'Paciente con ansiedad generalizada. Progreso positivo en las últimas sesiones.'
      },
      {
        id: 'pat2',
        email: 'carlos.lopez@email.com',
        name: 'Carlos López',
        role: 'patient',
        assignedPsychologist: 'psy1',
        status: 'active',
        treatmentStartDate: '2024-01-10',
        registrationDate: '2024-01-10',
        lastActivity: '2024-01-19',
        riskLevel: 'low',
        notes: 'Depresión leve. Respondiendo bien a la TCC.'
      },
      {
        id: 'pat3',
        email: 'ana.martinez@email.com',
        name: 'Ana Martínez',
        role: 'patient',
        assignedPsychologist: 'psy1',
        status: 'active',
        treatmentStartDate: '2024-01-05',
        registrationDate: '2024-01-05',
        lastActivity: '2024-01-18',
        riskLevel: 'high',
        notes: 'Requiere seguimiento cercano. Episodios de pánico frecuentes.'
      },
      {
        id: 'pat4',
        email: 'pedro.sanchez@email.com',
        name: 'Pedro Sánchez',
        role: 'patient',
        assignedPsychologist: 'psy2',
        status: 'completed',
        treatmentStartDate: '2023-11-01',
        registrationDate: '2023-11-01',
        lastActivity: '2024-01-15',
        riskLevel: 'low',
        notes: 'Tratamiento completado exitosamente. Alta médica.'
      },
      {
        id: 'pat5',
        email: 'lucia.fernandez@email.com',
        name: 'Lucía Fernández',
        role: 'patient',
        assignedPsychologist: 'psy2',
        status: 'inactive',
        treatmentStartDate: '2024-01-01',
        registrationDate: '2024-01-01',
        lastActivity: '2024-01-10',
        riskLevel: 'medium',
        notes: 'Paciente inactiva. Último contacto hace 10 días.'
      },
      {
        id: 'pat6',
        email: 'sofia.ruiz@email.com',
        name: 'Sofía Ruiz',
        role: 'patient',
        assignedPsychologist: 'psy3',
        status: 'active',
        treatmentStartDate: '2024-01-12',
        registrationDate: '2024-01-12',
        lastActivity: '2024-01-20',
        riskLevel: 'high',
        notes: 'Adolescente con trastorno alimentario. Requiere atención especializada.'
      }
    ];

    setStats(mockStats);
    setPsychologists(mockPsychologists);
    setPatients(mockPatients);
  }, []);

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

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    const matchesRisk = filterRisk === 'all' || patient.riskLevel === filterRisk;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const filteredPsychologists = psychologists.filter(psy => 
    psy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    psy.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    psy.license.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
              <p className="text-2xl font-bold text-green-600">{stats?.activeUsers}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Psicólogos</p>
              <p className="text-2xl font-bold text-purple-600">{stats?.totalPsychologists}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Estado Promedio</p>
              <p className="text-2xl font-bold text-orange-600">{stats?.averageMood}/10</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Riesgo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Riesgo Bajo</p>
                <p className="text-2xl font-bold text-green-900">{stats?.riskDistribution.low}</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                <span className="text-green-800 font-bold">
                  {stats ? Math.round((stats.riskDistribution.low / stats.totalPatients) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Riesgo Medio</p>
                <p className="text-2xl font-bold text-yellow-900">{stats?.riskDistribution.medium}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                <span className="text-yellow-800 font-bold">
                  {stats ? Math.round((stats.riskDistribution.medium / stats.totalPatients) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Riesgo Alto</p>
                <p className="text-2xl font-bold text-red-900">{stats?.riskDistribution.high}</p>
              </div>
              <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                <span className="text-red-800 font-bold">
                  {stats ? Math.round((stats.riskDistribution.high / stats.totalPatients) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad de la Plataforma</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Registros Emocionales</span>
              <span className="font-semibold text-gray-900">{stats?.totalEmotions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sesiones TCC</span>
              <span className="font-semibold text-gray-900">{stats?.totalThoughts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tasa de Actividad</span>
              <span className="font-semibold text-green-600">
                {stats ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Psicólogos Activos</h3>
          <div className="space-y-3">
            {psychologists.slice(0, 3).map(psy => (
              <div key={psy.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{psy.name}</p>
                  <p className="text-sm text-gray-600">{psy.patients.length}/{psy.maxPatients} pacientes</p>
                </div>
                <div className="text-right">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(psy.patients.length / psy.maxPatients) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PatientsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Gestión de Pacientes</h3>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Paciente</span>
        </button>
      </div>

      {/* Stats Cards para Pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <p className="text-sm font-medium text-gray-600">Activos</p>
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
            <Award className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
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

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Psicólogo Asignado
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
              {filteredPatients.map((patient) => {
                const assignedPsy = psychologists.find(p => p.id === patient.assignedPsychologist);
                return (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{assignedPsy?.name || 'Sin asignar'}</div>
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
                            setSelectedItem(patient);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const PsychologistsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Gestión de Psicólogos</h3>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Agregar Psicólogo</span>
        </button>
      </div>

      {/* Stats Cards para Psicólogos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Psicólogos</p>
              <p className="text-2xl font-bold text-purple-600">{psychologists.length}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Capacidad Total</p>
              <p className="text-2xl font-bold text-blue-600">
                {psychologists.reduce((sum, psy) => sum + psy.maxPatients, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pacientes Asignados</p>
              <p className="text-2xl font-bold text-green-600">
                {psychologists.reduce((sum, psy) => sum + psy.patients.length, 0)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilización</p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round((psychologists.reduce((sum, psy) => sum + psy.patients.length, 0) / 
                  psychologists.reduce((sum, psy) => sum + psy.maxPatients, 0)) * 100)}%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar psicólogos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Psychologists Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Psicólogo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Licencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especialización
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pacientes
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
              {filteredPsychologists.map((psy) => (
                <tr key={psy.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{psy.name}</div>
                      <div className="text-sm text-gray-500">{psy.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {psy.license}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {psy.specialization.slice(0, 2).map(spec => (
                        <span key={spec} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                          {spec}
                        </span>
                      ))}
                      {psy.specialization.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          +{psy.specialization.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 mr-2">{psy.patients.length}/{psy.maxPatients}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(psy.patients.length / psy.maxPatients) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {psy.lastActivity ? new Date(psy.lastActivity).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedItem(psy);
                          setShowDetailModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Desactivar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Configuración del Sistema</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Configuración General</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Registro de nuevos usuarios</span>
              <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Habilitado</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Notificaciones por email</span>
              <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Habilitado</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Backup automático</span>
              <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Activo</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Seguridad</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Autenticación 2FA</span>
              <button className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Opcional</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Encriptación de datos</span>
              <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Activa</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Logs de auditoría</span>
              <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Habilitados</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Modal de detalles
  const DetailModal = () => {
    if (!selectedItem) return null;

    const isPatient = 'assignedPsychologist' in selectedItem;
    const item = selectedItem as Patient | Psychologist;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
                <p className="text-gray-600">{item.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  {isPatient ? (
                    <>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor((item as Patient).status)}`}>
                        {(item as Patient).status === 'active' ? 'Activo' : (item as Patient).status === 'inactive' ? 'Inactivo' : 'Completado'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor((item as Patient).riskLevel)}`}>
                        Riesgo {(item as Patient).riskLevel === 'high' ? 'Alto' : (item as Patient).riskLevel === 'medium' ? 'Medio' : 'Bajo'}
                      </span>
                    </>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Psicólogo
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            {isPatient ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Días en tratamiento</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {Math.floor((new Date().getTime() - new Date((item as Patient).treatmentStartDate).getTime()) / (1000 * 60 * 60 * 24))}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Registros emocionales</p>
                      <p className="text-2xl font-bold text-purple-900">24</p>
                    </div>
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Sesiones TCC</p>
                      <p className="text-2xl font-bold text-green-900">8</p>
                    </div>
                    <Brain className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Profesional</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Licencia:</span>
                      <span className="text-sm font-medium text-gray-900">{(item as Psychologist).license}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Capacidad máxima:</span>
                      <span className="text-sm font-medium text-gray-900">{(item as Psychologist).maxPatients} pacientes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pacientes actuales:</span>
                      <span className="text-sm font-medium text-gray-900">{(item as Psychologist).patients.length}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Especializaciones</h3>
                  <div className="flex flex-wrap gap-2">
                    {(item as Psychologist).specialization.map(spec => (
                      <span key={spec} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isPatient && (item as Patient).notes && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Notas del Terapeuta</h3>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-gray-700">{(item as Patient).notes}</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona usuarios, psicólogos y configuración del sistema.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[
          { id: 'overview', label: 'Resumen', icon: BarChart3 },
          { id: 'patients', label: 'Pacientes', icon: Users },
          { id: 'psychologists', label: 'Psicólogos', icon: Shield },
          { id: 'settings', label: 'Configuración', icon: Settings },
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-blue-700 shadow-sm font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'patients' && <PatientsTab />}
      {activeTab === 'psychologists' && <PsychologistsTab />}
      {activeTab === 'settings' && <SettingsTab />}

      {/* Detail Modal */}
      {showDetailModal && <DetailModal />}
    </div>
  );
}