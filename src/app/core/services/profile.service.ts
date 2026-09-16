import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService, User } from './auth.service';
import { ToastService } from './toast.service';

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'student' | 'admin';
  avatarUrl: string;
  bio?: string;
  careerGoal?: string;
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  resumeName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly STORAGE_KEY = 'hasura_profile_data';
  private profileSubject = new BehaviorSubject<StudentProfile | null>(null);
  public profile$ = this.profileSubject.asObservable();

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.initProfile();
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.syncFromUser(user);
      }
    });
  }

  private initProfile(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          this.profileSubject.next(JSON.parse(stored));
          return;
        } catch (e) {
          console.error('Failed to parse profile data', e);
        }
      }
    }

    // Default student profile
    const defaultProfile: StudentProfile = {
      id: 'usr_demo',
      fullName: 'Alex Vance',
      email: 'alex.vance@example.com',
      phone: '+1 (555) 349-2041',
      role: 'student',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'Full-stack software engineer & AI enthusiast passionate about building high-performance distributed systems.',
      careerGoal: 'Senior AI Engineer at High-Growth Tech Venture',
      skills: ['Python', 'FastAPI', 'Angular', 'AWS', 'Docker', 'LangChain'],
      githubUrl: 'https://github.com/hasura-learner',
      linkedinUrl: 'https://linkedin.com/in/hasura-learner',
      resumeName: 'Alex_Vance_Software_Engineer_CV.pdf'
    };

    this.saveProfile(defaultProfile);
  }

  private syncFromUser(user: User): void {
    const current = this.profileSubject.value;
    if (!current || current.id !== user.id) {
      const synced: StudentProfile = {
        id: user.id,
        fullName: user.name || 'Hasura Innovator',
        email: user.email,
        role: (user.role === 'admin' ? 'admin' : 'student'),
        avatarUrl: user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`,
        skills: current?.skills || ['Angular', 'TypeScript', 'Cloud'],
        bio: current?.bio || 'Passionate developer mastering modern software engineering with Hasura.',
        careerGoal: current?.careerGoal || 'Full-Stack Software Engineer'
      };
      this.saveProfile(synced);
    }
  }

  private saveProfile(profile: StudentProfile): void {
    this.profileSubject.next(profile);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
      } catch (e) {
        console.error('Failed to write profile to localStorage', e);
      }
    }
  }

  updateProfile(updates: Partial<StudentProfile>): Observable<StudentProfile> {
    const current = this.profileSubject.value;
    if (!current) {
      return of({} as StudentProfile);
    }

    const updated: StudentProfile = { ...current, ...updates };
    this.saveProfile(updated);
    this.toastService.success('Profile Saved', 'Your student profile information has been updated.');
    return of(updated);
  }
}
