import React from 'react';
import { Home, Heart, Brain, BarChart3, BookOpen, LogOut, User, Users, Settings } from 'lucide-react';
import { ViewType, User as UserType } from '../types';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  user: UserType;
  onLogout: () => void;
}

export default function Navigation({ currentView, onViewChange, user, onLogout }: NavigationProps) {
  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard' as ViewType, label: 'Dashboard', icon: Home },
    ];

    if (user.role === 'patient' || !user.role) {
      return [
        ...baseItems,
        { id: 'emotions' as ViewType, label: 'Emociones', icon: Heart },
        { id: 'thoughts' as ViewType, label: 'Pensamientos', icon: Brain },
        { id: 'analytics' as ViewType, label: 'Análisis', icon: BarChart3 },
        { id: 'resources' as ViewType, label: 'Recursos', icon: BookOpen },
      ];
    }

    if (user.role === 'psychologist') {
      return [
        ...baseItems,
        { id: 'patients' as ViewType, label: 'Pacientes', icon: Users },
        { id: 'analytics' as ViewType, label: 'Análisis', icon: BarChart3 },
        { id: 'resources' as ViewType, label: 'Recursos', icon: BookOpen },
      ];
    }

    if (user.role === 'admin') {
      return [
        ...baseItems,
        { id: 'users' as ViewType, label: 'Usuarios', icon: Users },
        { id: 'analytics' as ViewType, label: 'Análisis', icon: BarChart3 },
        { id: 'admin' as ViewType, label: 'Administración', icon: Settings },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'psychologist': return 'from-purple-500 to-indigo-500';
      case 'admin': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'psychologist': return 'Psicólogo';
      case 'admin': return 'Admin';
      default: return 'Paciente';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-md">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cony App
              </h1>
              {user.role && user.role !== 'patient' && (
                <span className="text-xs text-gray-500">{getRoleLabel(user.role)}</span>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-blue-100 text-blue-700 font-medium shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 bg-gradient-to-r ${getRoleColor(user.role)} rounded-full flex items-center justify-center`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium text-gray-700 block">{user.name}</span>
                  <span className="text-xs text-gray-500">{getRoleLabel(user.role)}</span>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                );
              })}
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}