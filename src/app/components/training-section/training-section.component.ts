import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Course } from '../../core/models/course.model';

@Component({
  selector: 'app-training-section',
  templateUrl: './training-section.component.html',
  styleUrls: ['./training-section.component.scss']
})
export class TrainingSectionComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  activeFilter = 'All';

  filters = ['All', 'AI', 'Cloud', 'DevOps', 'Development', 'Design'];

  selectedCourse: Course | null = null;
  isModalOpen = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = data;
    });
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    if (filter === 'All') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(c => c.category === filter);
    }
  }

  openCourseModal(course: Course): void {
    this.selectedCourse = course;
    this.isModalOpen = true;
  }

  closeCourseModal(): void {
    this.isModalOpen = false;
    this.selectedCourse = null;
  }
}
