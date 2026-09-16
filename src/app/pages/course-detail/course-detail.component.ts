import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { EnrollmentService } from '../../core/services/enrollment.service';
import { AuthService } from '../../core/services/auth.service';
import { Course } from '../../core/models/course.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course?: Course;
  loading = true;
  activeModuleIndex = 0;
  isEnrolled = false;
  openFaqIndex: number | null = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') || '';
      this.loadCourse(slug);
    });
  }

  private loadCourse(slug: string): void {
    this.loading = true;
    this.courseService.getCourseByIdOrSlug(slug).subscribe(course => {
      this.course = course;
      this.loading = false;
      if (course) {
        this.checkEnrollmentStatus(course.id);
      }
    });
  }

  private checkEnrollmentStatus(courseId: string): void {
    const user = this.authService.currentUserValue;
    this.enrollmentService.isEnrolled(courseId, user?.id).subscribe(enrolled => {
      this.isEnrolled = enrolled;
    });
  }

  toggleModule(index: number): void {
    this.activeModuleIndex = this.activeModuleIndex === index ? -1 : index;
  }

  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  handleEnroll(): void {
    if (!this.course) return;

    if (!this.authService.isAuthenticated) {
      // Save intent and take to login / signup
      this.router.navigate(['/login'], { queryParams: { returnUrl: `/courses/${this.course.slug || this.course.id}` } });
      return;
    }

    this.enrollmentService.enroll(this.course).subscribe(() => {
      this.isEnrolled = true;
      this.router.navigate(['/student/dashboard']);
    });
  }
}
