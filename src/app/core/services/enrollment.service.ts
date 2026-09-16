import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { CourseService } from './course.service';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  category: string;
  status: 'enrolled' | 'in_progress' | 'completed';
  progress: number; // 0 to 100
  enrolledAt: string;
  completedAt?: string;
  certificateId?: string;
  currentLesson?: string;
  course?: Course;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private readonly STORAGE_KEY = 'hasura_enrollments_db';
  private enrollmentsSubject = new BehaviorSubject<Enrollment[]>([]);
  public enrollments$ = this.enrollmentsSubject.asObservable();

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.initEnrollments();
  }

  private initEnrollments(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          this.enrollmentsSubject.next(parsed);
          return;
        } catch (e) {
          console.error('Failed to parse enrollments from localStorage', e);
        }
      }
    }

    // Default seed enrollments for demo experience
    const initialEnrollments: Enrollment[] = [
      {
        id: 'enr_genai_1',
        userId: 'usr_demo',
        courseId: 'genai',
        courseTitle: 'Generative AI',
        category: 'AI',
        status: 'in_progress',
        progress: 68,
        enrolledAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        currentLesson: 'Module 3: Vector Embeddings & RAG Optimization',
        certificateId: undefined
      },
      {
        id: 'enr_aws_1',
        userId: 'usr_demo',
        courseId: 'aws-cloud',
        courseTitle: 'AWS Cloud Computing',
        category: 'Cloud',
        status: 'completed',
        progress: 100,
        enrolledAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        certificateId: 'HASURA-AWS-2026-9821'
      }
    ];

    this.saveEnrollments(initialEnrollments);
  }

  private saveEnrollments(enrollments: Enrollment[]): void {
    this.enrollmentsSubject.next(enrollments);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(enrollments));
      } catch (e) {
        console.error('Failed to write enrollments to localStorage', e);
      }
    }
  }

  getUserEnrollments(userId?: string): Observable<Enrollment[]> {
    return this.enrollments$.pipe(
      map(list => {
        if (!userId) return list;
        return list.filter(e => e.userId === userId || e.userId === 'usr_demo');
      })
    );
  }

  isEnrolled(courseId: string, userId?: string): Observable<boolean> {
    return this.getUserEnrollments(userId).pipe(
      map(enrollments => enrollments.some(e => e.courseId === courseId))
    );
  }

  enroll(course: Course): Observable<Enrollment> {
    const user = this.authService.currentUserValue;
    const userId = user?.id || 'usr_guest_' + Date.now().toString(36);
    const existing = this.enrollmentsSubject.value.find(e => e.courseId === course.id && (e.userId === userId || !user));

    if (existing) {
      this.toastService.info('Already Enrolled', `You are already taking "${course.title}".`);
      return of(existing);
    }

    const newEnrollment: Enrollment = {
      id: 'enr_' + Math.random().toString(36).substring(2, 9),
      userId,
      courseId: course.id,
      courseTitle: course.title,
      category: course.category,
      status: 'in_progress',
      progress: 5,
      enrolledAt: new Date().toISOString(),
      currentLesson: 'Module 1: Orientation & Architecture Setup'
    };

    const updated = [newEnrollment, ...this.enrollmentsSubject.value];
    this.saveEnrollments(updated);
    this.toastService.success('Enrollment Confirmed!', `You have been enrolled in ${course.title}. Welcome aboard!`);
    return of(newEnrollment);
  }

  updateProgress(enrollmentId: string, deltaPercent: number): void {
    const list = this.enrollmentsSubject.value;
    const item = list.find(e => e.id === enrollmentId);
    if (item) {
      item.progress = Math.min(100, Math.max(0, item.progress + deltaPercent));
      if (item.progress >= 100) {
        item.status = 'completed';
        item.completedAt = new Date().toISOString();
        item.certificateId = item.certificateId || `HASURA-${item.category.toUpperCase()}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        this.toastService.success('Course Completed!', `Congratulations! Certificate issued: ${item.certificateId}`);
      }
      this.saveEnrollments([...list]);
    }
  }
}
