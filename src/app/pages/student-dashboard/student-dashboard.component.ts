import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';
import { EnrollmentService, Enrollment } from '../../core/services/enrollment.service';
import { ProfileService, StudentProfile } from '../../core/services/profile.service';
import { ToastService } from '../../core/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  activeTab: 'courses' | 'projects' | 'certificates' | 'profile' | 'career' = 'courses';
  currentUser$: Observable<User | null>;
  enrollments$: Observable<Enrollment[]>;
  profile$: Observable<StudentProfile | null>;

  // Profile Form Model
  profileForm = {
    fullName: '',
    phone: '',
    careerGoal: '',
    bio: '',
    githubUrl: '',
    linkedinUrl: ''
  };

  // Mock Career Support items
  careerRequests = [
    { type: 'Resume Review', status: 'Completed', date: 'Sept 10, 2026', notes: 'Action verbs enhanced, ATS match scored at 94%.' },
    { type: 'Technical Mock Interview', status: 'Scheduled', date: 'Sept 18, 2026 (10:00 AM UTC)', notes: 'System Design & High-Concurrency Architecture with Senior Staff Engineer.' }
  ];

  constructor(
    public authService: AuthService,
    private enrollmentService: EnrollmentService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.enrollments$ = this.enrollmentService.getUserEnrollments();
    this.profile$ = this.profileService.profile$;
  }

  ngOnInit(): void {
    this.profile$.subscribe(p => {
      if (p) {
        this.profileForm = {
          fullName: p.fullName,
          phone: p.phone || '',
          careerGoal: p.careerGoal || '',
          bio: p.bio || '',
          githubUrl: p.githubUrl || '',
          linkedinUrl: p.linkedinUrl || ''
        };
      }
    });
  }

  setTab(tab: 'courses' | 'projects' | 'certificates' | 'profile' | 'career'): void {
    this.activeTab = tab;
  }

  incrementProgress(enrollment: Enrollment, delta: number): void {
    this.enrollmentService.updateProgress(enrollment.id, delta);
  }

  saveProfile(): void {
    this.profileService.updateProfile(this.profileForm);
  }

  requestMockInterview(): void {
    this.toastService.success(
      'Session Requested',
      'Your request for a mock technical interview has been placed. Our career mentor will email calendar availability.'
    );
  }

  requestResumeReview(): void {
    this.toastService.success(
      'Resume Review Queued',
      'Your profile has been queued for comprehensive line-by-line review.'
    );
  }

  getAverageProgress(enrollments: Enrollment[]): number {
    if (!enrollments || enrollments.length === 0) return 0;
    const sum = enrollments.reduce((acc, curr) => acc + curr.progress, 0);
    return Math.round(sum / enrollments.length);
  }

  getCompletedCount(enrollments: Enrollment[]): number {
    if (!enrollments) return 0;
    return enrollments.filter(e => e.status === 'completed' || e.progress >= 100).length;
  }

  downloadCertificate(certId: string): void {
    this.toastService.success(
      'Generating PDF Credential',
      `Certificate ${certId} is being prepared for high-resolution download.`
    );
  }

  shareCertificate(certId: string): void {
    const url = `https://hasura.tech/verify/${certId}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.toastService.info('Link Copied', 'Verification URL copied to clipboard for LinkedIn or resume sharing.');
      });
    } else {
      this.toastService.info('Verification URL', url);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

