import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Service } from '../models/service.model';
import { Course } from '../models/course.model';
import { Project } from '../models/project.model';
import { Testimonial } from '../models/testimonial.model';
import { Career } from '../models/career.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly basePath = 'assets/data';

  constructor(private http: HttpClient) {}

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.basePath}/services.json`);
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.basePath}/courses.json`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.basePath}/projects.json`);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.basePath}/testimonials.json`);
  }

  getTechnologies(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/technologies.json`);
  }

  getCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(`${this.basePath}/careers.json`);
  }

  getAllData(): Observable<any> {
    return forkJoin({
      services: this.getServices(),
      courses: this.getCourses(),
      projects: this.getProjects(),
      testimonials: this.getTestimonials(),
      technologies: this.getTechnologies(),
      careers: this.getCareers()
    });
  }
}
