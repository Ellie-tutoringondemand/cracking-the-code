export interface PatientProfile {
  name: string;
  stage: 'early' | 'late';
  memories: string;
  comforts: string;
  music: string;
  communication: string;
  routines: string;
  wishes: string;
  dislikes: string;
}

export type UserType = 'patient' | 'carer';

export type Page = 'home' | 'education' | 'personalisation' | 'carer-portal';

export interface EducationSection {
  id: string;
  title: string;
  content: string;
  category: 'patient' | 'carer' | 'both';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}