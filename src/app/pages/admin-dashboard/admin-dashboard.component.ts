import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService, AdminStats } from '../../core/services/admin.service';
import { CourseService } from '../../core/services/course.service';
import { ContactService, ContactSubmission } from '../../core/services/contact.service';
import { EnrollmentService, Enrollment } from '../../core/services/enrollment.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Course } from '../../core/models/course.model';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  activeTab: 'overview' | 'courses' | 'leads' | 'enrollments' = 'overview';
  stats$: Observable<AdminStats>;
  courses$: Observable<Course[]>;
  submissions$: Observable<ContactSubmission[]>;
  enrollments$: Observable<Enrollment[]>;

  // Filter and Search States
  courseFilter = 'all';
  courseSearch = '';
  leadFilter: 'all' | 'new' | 'contacted' | 'resolved' = 'all';
  leadSearch = '';

  // Quick Add Course Modal State
  isAddCourseModalOpen = false;
  newCourse: Partial<Course> = {
    title: '',
    category: 'AI',
    subtitle: '',
    description: '',
    duration: '16 Weeks',
    level: 'Intermediate',
    price: 699,
    technologies: ['Python', 'Cloud'],
    projects: 4,
    outcome: 'Software Specialist',
    careerSupport: ['Resume Review', 'Interview Prep'],
    featured: false,
    icon: 'brain'
  };

  techInput = 'Python, Cloud';

  constructor(
    private adminService: AdminService,
    private courseService: CourseService,
    private contactService: ContactService,
    private enrollmentService: EnrollmentService,
    private toastService: ToastService,
    public authService: AuthService,
    private router: Router
  ) {
    this.stats$ = this.adminService.getStats();
    this.courses$ = this.courseService.courses$;
    this.submissions$ = this.contactService.submissions$;
    this.enrollments$ = this.enrollmentService.enrollments$;
  }

  ngOnInit(): void {}

  setTab(tab: 'overview' | 'courses' | 'leads' | 'enrollments'): void {
    this.activeTab = tab;
  }

  toggleCourseStatus(course: Course): void {
    this.courseService.toggleActiveStatus(course.id);
    const newStatus = course.is_active !== false ? 'hidden' : 'published';
    this.toastService.info('Course Status Updated', `"${course.title}" is now ${newStatus}.`);
  }

  updateLeadStatus(submission: ContactSubmission, status: 'new' | 'contacted' | 'resolved'): void {
    this.contactService.updateStatus(submission.id, status);
  }

  openAddCourse(): void {
    this.newCourse = {
      title: '',
      category: 'AI',
      subtitle: '',
      description: '',
      duration: '16 Weeks',
      level: 'Intermediate',
      price: 699,
      technologies: ['Python', 'Cloud'],
      projects: 4,
      outcome: 'Software Specialist',
      careerSupport: ['Resume Review', 'Interview Prep'],
      featured: false,
      icon: 'brain'
    };
    this.techInput = 'Python, Cloud';
    this.isAddCourseModalOpen = true;
  }

  closeAddCourse(): void {
    this.isAddCourseModalOpen = false;
  }

  submitNewCourse(): void {
    if (!this.newCourse.title?.trim()) {
      this.toastService.error('Validation Error', 'Please enter a course title.');
      return;
    }

    const id = this.newCourse.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const fullCourse: Course = {
      id,
      slug: id,
      title: this.newCourse.title.trim(),
      subtitle: this.newCourse.subtitle?.trim() || 'Mastery Program',
      description: this.newCourse.description?.trim() || 'Production-grade curriculum engineered for real-world excellence.',
      category: this.newCourse.category || 'AI',
      duration: this.newCourse.duration || '16 Weeks',
      level: this.newCourse.level || 'Intermediate',
      price: Number(this.newCourse.price) || 699,
      technologies: this.techInput.split(',').map(t => t.trim()).filter(Boolean),
      projects: Number(this.newCourse.projects) || 4,
      outcome: this.newCourse.outcome || 'Senior Software Engineer',
      careerSupport: ['Resume Review', 'Mock Interviews', 'Placement Assistance'],
      featured: false,
      icon: 'layers',
      is_active: true
    };

    this.courseService.addCourse(fullCourse);
    this.toastService.success('Course Published', `"${fullCourse.title}" is now active in the catalog.`);
    this.closeAddCourse();
  }

  exportLeadsCSV(leads: ContactSubmission[]): void {
    if (!leads || leads.length === 0) {
      this.toastService.info('Export', 'No leads available to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Date', 'Message'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      `"${l.company || ''}"`,
      `"${l.service}"`,
      l.status,
      `"${l.createdAt}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hasura_leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.toastService.success('Leads Exported', 'CSV file downloaded successfully.');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
