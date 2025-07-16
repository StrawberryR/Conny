export interface Emotion {
  id: string;
  name: string;
  intensity: number;
  date: string;
  note?: string;
  triggers?: string[];
}

export interface ThoughtRecord {
  id: string;
  date: string;
  situation: string;
  automaticThought: string;
  emotion: string;
  emotionIntensity: number;
  evidence: string;
  alternativeThought: string;
  newEmotionIntensity: number;
}

export interface Activity {
  id: string;
  name: string;
  category: 'exercise' | 'social' | 'work' | 'leisure' | 'selfcare';
  mood: number;
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: 'patient' | 'psychologist' | 'admin';
  assignedPsychologist?: string;
  registrationDate?: string;
  lastActivity?: string;
}

export interface Patient extends User {
  role: 'patient';
  assignedPsychologist: string;
  status: 'active' | 'inactive' | 'completed';
  treatmentStartDate: string;
  notes?: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Psychologist extends User {
  role: 'psychologist';
  license: string;
  specialization: string[];
  patients: string[];
  maxPatients: number;
}

export interface AdminStats {
  totalUsers: number;
  totalPsychologists: number;
  totalPatients: number;
  activeUsers: number;
  totalEmotions: number;
  totalThoughts: number;
  averageMood: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
}

export type ViewType = 'dashboard' | 'emotions' | 'thoughts' | 'analytics' | 'resources' | 'patients' | 'users' | 'admin';