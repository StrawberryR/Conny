import React, { useState, useEffect } from 'react';
import { Users, UserCheck, AlertTriangle, TrendingUp, BarChart3, Settings, Shield, Database } from 'lucide-react';
import { AdminStats, User, Patient, Psychologist } from '../../types';

interface AdminDashboardProps {
  currentUser: User;
}

export default function AdminDashboard({ currentUser }: AdminDashboardProps) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'settings'>('overview');
  const [userFilter, setUserFilter] = useState<'all' | 'patients' | 'psychologists'>('all');

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
        patients: ['1', '2', '3'],
        maxPatients: 20,
        registrationDate: '2024-01-01'
      },
      {
        id: 'psy2',
        email: 'dr.rodriguez@conyapp.com',
        name: 'Dr. Carlos Rodríguez',
        role: 'psychologist',
        license: 'PSY-2024-002',
        specialization: ['Trauma', 'EMDR', 'Terapia Familiar'],
        patients: ['4', '5'],
        maxPatients: 15,
        registrationDate: '2024-01-05'
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
        notes: 'Paciente con ansiedad generalizada.'
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
        notes: 'Depresión leve.'
      },
      {
        id: 'pat3',
        email: 'ana.martinez@email.com',
        name: 'Ana Martínez',
        role: 'patient',
        assignedPsychologist: 'psy2',
        status: 'active',
        treatmentStartDate: '2024-01-05',
        registrationDate: '2024-01-05',
        lastActivity: '2024-01-18',
        riskLevel: 'high',
        notes: 'Requiere seguimiento cercano.'
      }
    ];

    setStats(mockStats);
    setPsychologists(mockPsychologists);
    setPatients(mockPatients);
  }, []);

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
            {psychologists.map(psy => (
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

  const UsersTab = () => {
    const filteredUsers = () => {
      if (userFilter === 'psychologists') {
        return psychologists;
      } else if (userFilter === 'patients') {
        return patients;
      } else {
        return [...psychologists, ...patients];
      }
    };

    const getRoleColor = (role: string) => {
      switch (role) {
        case 'psychologist': return 'bg-purple-100 text-purple-800';
        case 'patient': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getRoleLabel = (role: string) => {
      switch (role) {
        case 'psychologist': return 'Psicólogo';
        case 'patient': return 'Paciente';
        default: return 'Usuario';
      }
    };

    const getRiskColor = (risk?: string) => {
      if (!risk) return '';
      switch (risk) {
        case 'high': return 'bg-red-100 text-red-800 border-red-200';
        case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'low': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Gestión de Usuarios</h3>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setUserFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                userFilter === 'all'
                  ? 'bg-white text-blue-700 shadow-sm font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Todos ({psychologists.length + patients.length})
            </button>
            <button
              onClick={() => setUserFilter('patients')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                userFilter === 'patients'
                  ? 'bg-white text-blue-700 shadow-sm font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pacientes ({patients.length})
            </button>
            <button
              onClick={() => setUserFilter('psychologists')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                userFilter === 'psychologists'
                  ? 'bg-white text-blue-700 shadow-sm font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Psicólogos ({psychologists.length})
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Agregar Usuario
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Información
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado/Actividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers().map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role || 'patient')}`}>
                      {getRoleLabel(user.role || 'patient')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === 'psychologist' ? (
                      <div className="flex flex-wrap gap-1">
                        {(user as Psychologist).specialization?.slice(0, 2).map(spec => (
                          <span key={spec} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {spec}
                          </span>
                        ))}
                        {(user as Psychologist).specialization?.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                            +{(user as Psychologist).specialization.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        {(user as Patient).riskLevel && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor((user as Patient).riskLevel)}`}>
                            Riesgo {(user as Patient).riskLevel === 'high' ? 'Alto' : (user as Patient).riskLevel === 'medium' ? 'Medio' : 'Bajo'}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role === 'psychologist' ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {(user as Psychologist).patients?.length || 0}/{(user as Psychologist).maxPatients || 0} pacientes
                        </div>
                        <div className="text-xs text-gray-500">Licencia: {(user as Psychologist).license}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {(user as Patient).status === 'active' ? 'Activo' : (user as Patient).status === 'inactive' ? 'Inactivo' : 'Completado'}
                        </div>
                        <div className="text-xs text-gray-500">
                          Última actividad: {user.lastActivity ? new Date(user.lastActivity).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-900">
                      {user.role === 'psychologist' ? 'Desactivar' : 'Suspender'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )};

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona usuarios, psicólogos y configuración del sistema.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Resumen', icon: BarChart3 },
          { id: 'users', label: 'Usuarios', icon: Users },
          { id: 'settings', label: 'Configuración', icon: Settings },
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
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
      {activeTab === 'users' && <UsersTab />}
      {activeTab === 'settings' && <SettingsTab />}
    </div>
  );
}