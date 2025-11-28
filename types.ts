export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  studentId?: string;
  // Extended Profile Fields
  aboutMe?: string;
  major?: string;
  yearLevel?: string;
  campus?: string;
  hobbies?: string[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  professor: string;
  schedule: string;
  progress: number; // 0-100
  nextAssignment?: string;
  nextAssignmentDue?: string;
  color: string;
}

export interface Activity {
  id: string;
  courseId: string;
  title: string;
  type: 'ASSIGNMENT' | 'QUIZ' | 'EXAM';
  dueDate: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED' | 'LATE';
  grade?: number;
  maxGrade: number;
}

export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  role: UserRole;
  title: string;
  content: string;
  category: 'General' | 'Question' | 'Announcement' | 'Lost & Found';
  likes: number;
  comments: number;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  status: 'LOST' | 'FOUND' | 'CLAIMED';
  date: string;
  contactName: string;
}

export interface ExcuseLetter {
  id: string;
  courseName: string;
  reason: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  attachmentUrl?: string;
}