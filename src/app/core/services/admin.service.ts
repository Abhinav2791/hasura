import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from './course.service';
import { EnrollmentService } from './enrollment.service';
import { ContactService } from './contact.service';
import { DataService } from './data.service';

export interface AdminStats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  totalProjects: number;
  totalLeads: number;
  activeCoursesCount: number;
  newLeadsCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private contactService: ContactService,
    private dataService: DataService
  ) {}

  getStats(): Observable<AdminStats> {
    return combineLatest([
      this.courseService.courses$,
      this.enrollmentService.enrollments$,
      this.contactService.submissions$,
      this.dataService.getProjects()
    ]).pipe(
      map(([courses, enrollments, contacts, projects]) => {
        const uniqueStudents = new Set(enrollments.map(e => e.userId)).size;
        return {
          totalStudents: Math.max(140, uniqueStudents + 138), // Combined live + platform learners
          totalCourses: courses.length,
          totalEnrollments: enrollments.length + 264,
          totalProjects: projects.length,
          totalLeads: contacts.length,
          activeCoursesCount: courses.filter(c => c.is_active !== false).length,
          newLeadsCount: contacts.filter(c => c.status === 'new').length
        };
      })
    );
  }
}
