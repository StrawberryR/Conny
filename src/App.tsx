import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useEmotions } from './hooks/useEmotions';
import { useThoughtRecords } from './hooks/useThoughtRecords';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import EmotionTracker from './components/EmotionTracker';
import ThoughtRecord from './components/ThoughtRecord';
import Analytics from './components/Analytics';
import Resources from './components/Resources';
import PatientsManagement from './components/Psychologist/PatientsManagement';
import AdminDashboard from './components/Admin/AdminDashboard';
import Login from './components/Auth/Login';
import { ViewType } from './types';

function App() {
  const { user: authUser, profile, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const { emotions, addEmotion, deleteEmotion } = useEmotions();
  const { thoughtRecords, addThoughtRecord, deleteThoughtRecord } = useThoughtRecords();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const handleLogin = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    if (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    const { error } = await signUp(email, password, name);
    if (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogout = () => {
    signOut();
    setCurrentView('dashboard');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const renderCurrentView = () => {
    if (!profile) return null;

    switch (currentView) {
      case 'dashboard':
        if (profile.role === 'admin') {
          return <AdminDashboard currentUser={profile} />;
        }
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={profile} />;
      
      case 'emotions':
        if (profile.role === 'patient' || !profile.role) {
          return (
            <EmotionTracker
              emotions={emotions}
              onAddEmotion={addEmotion}
              onDeleteEmotion={deleteEmotion}
            />
          );
        }
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={profile} />;
      
      case 'thoughts':
        if (profile.role === 'patient' || !profile.role) {
          return (
            <ThoughtRecord
              thoughtRecords={thoughtRecords}
              onAddThought={addThoughtRecord}
              onDeleteThought={deleteThoughtRecord}
            />
          );
        }
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={profile} />;
      
      case 'analytics':
        return <Analytics emotions={emotions} thoughtRecords={thoughtRecords} />;
      
      case 'resources':
        return <Resources />;
      
      case 'patients':
        if (profile.role === 'psychologist' || profile.role === 'admin') {
          return <PatientsManagement currentUser={profile} />;
        }
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={profile} />;
      
      case 'admin':
        if (profile.role === 'admin') {
          return <AdminDashboard currentUser={profile} />;
        }
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={profile} />;
      
      default:
        return <Dashboard emotions={emotions} thoughtRecords={thoughtRecords} user={profile} />;
    }
  };

  if (!authUser || !profile) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        user={profile}
        onLogout={handleLogout}
      />
      <main className="pb-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;