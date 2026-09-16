import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly STORAGE_KEY = 'hasura_courses_db';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();
  private initialized = false;

  constructor(
    private http: HttpClient,
    private supabase: SupabaseService
  ) {
    this.initCourses();
    this.fetchRemoteCourses();
  }

  private fetchRemoteCourses(): void {
    if (this.supabase.isLive) {
      this.supabase.from('courses')
        .select('*')
        .then(
          ({ data, error }) => {
            if (!error && data && data.length > 0) {
              const mapped = data.map((c: any) => this.enrichCourse(c));
              this.saveCourses(mapped);
            }
          },
          () => {}
        );
    }
  }

  private initCourses(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.coursesSubject.next(parsed);
            this.initialized = true;
            return;
          }
        } catch (e) {
          console.error('Failed to parse courses from local storage', e);
        }
      }
    }

    this.http.get<Course[]>('assets/data/courses.json').subscribe({
      next: (data) => {
        const enriched = data.map(c => this.enrichCourse(c));
        this.saveCourses(enriched);
        this.initialized = true;
      },
      error: () => {
        // Fallback default set if HTTP is slow or offline
        const defaults = this.getDefaultCourses();
        this.saveCourses(defaults);
        this.initialized = true;
      }
    });
  }

  private enrichCourse(c: Course): Course {
    const slug = c.slug || c.id;
    return {
      ...c,
      slug,
      price: c.price || 699,
      is_active: c.is_active !== undefined ? c.is_active : true,
      whatYouWillLearn: c.whatYouWillLearn || [
        `Architect and build scalable real-world systems with ${c.technologies.slice(0, 3).join(', ')}`,
        'Master industry-standard engineering workflows and design patterns',
        'Implement production-ready automated testing and CI/CD pipelines',
        'Build and publish a comprehensive enterprise portfolio project',
        'Ace technical interviews and coding rounds at leading technology companies'
      ],
      curriculum: c.curriculum || [
        {
          moduleNumber: 1,
          title: 'Foundations & Architecture',
          duration: 'Weeks 1-4',
          lessons: [
            'Ecosystem Overview & Modern Toolchain Setup',
            'Core Concepts, Memory Management & Best Practices',
            'Designing Scalable Architecture & Data Flow',
            'Practical Lab: Building your initial micro-service'
          ]
        },
        {
          moduleNumber: 2,
          title: 'Advanced Engineering & Deep Dive',
          duration: 'Weeks 5-8',
          lessons: [
            'Deep dive into performance optimizations & bottlenecks',
            'Integration with Cloud Infrastructure & APIs',
            'Security, Authorization & Authentication workflows',
            'Practical Lab: Real-time data streaming & state persistence'
          ]
        },
        {
          moduleNumber: 3,
          title: 'Production Deployments & Scale',
          duration: 'Weeks 9-12',
          lessons: [
            'Containerization, Orchestration & Cloud Deployment',
            'Monitoring, Distributed Tracing & Observability',
            'Automated Testing, CI/CD pipelines and rollbacks',
            'Practical Lab: High-availability cluster deployment'
          ]
        },
        {
          moduleNumber: 4,
          title: 'Capstone Project & Career Launch',
          duration: 'Weeks 13-16',
          lessons: [
            'End-to-End Enterprise Capstone Architecture',
            'Code Review, Architecture Defense & Industry Feedback',
            'Resume & LinkedIn Optimization by Tech Leaders',
            'Mock Technical Interviews & Direct Placement Assistance'
          ]
        }
      ],
      capstoneProjects: c.capstoneProjects || [
        {
          title: `${c.title} Enterprise Suite`,
          description: `Full-lifecycle production application demonstrating end-to-end resilience, multi-tier security, and real-time processing using ${c.technologies.slice(0, 3).join(', ')}.`,
          tags: c.technologies.slice(0, 4)
        },
        {
          title: 'High-Throughput Distributed Microservice',
          description: 'Zero-downtime resilient microservice architecture supporting 10,000+ RPS with distributed logging and cloud-native auto-scaling.',
          tags: ['Cloud', 'Docker', 'REST API']
        }
      ],
      faqs: c.faqs || [
        {
          question: 'What are the prerequisites for this course?',
          answer: 'Basic programming fundamentals are helpful. We start from foundational principles before transitioning into advanced architecture.'
        },
        {
          question: 'How much time commitment is expected per week?',
          answer: 'We recommend 8-10 hours per week, including live mentor sessions, code reviews, and hands-on lab projects.'
        },
        {
          question: 'Do you provide direct placement and interview support?',
          answer: 'Yes! Every enrolled learner receives 1-on-1 resume optimization, LinkedIn profile review, technical mock interviews, and placement assistance.'
        }
      ]
    };
  }

  private getDefaultCourses(): Course[] {
    return [
      {
        id: 'genai',
        slug: 'generative-ai',
        category: 'AI',
        title: 'Generative AI',
        subtitle: 'Build with the Most Transformative Technology',
        description: 'Master generative AI development from fundamentals to production-grade applications. Build intelligent systems using the latest LLMs and AI frameworks.',
        technologies: ['Python', 'OpenAI', 'LangChain', 'RAG', 'Vector Databases', 'FastAPI', 'Hugging Face'],
        duration: '16 Weeks',
        level: 'Intermediate',
        projects: 5,
        outcome: 'AI Application Developer',
        careerSupport: ['Resume Review', 'LinkedIn Optimization', 'Interview Prep', 'Mock Interviews'],
        featured: true,
        icon: 'brain',
        price: 799
      },
      {
        id: 'aws-cloud',
        slug: 'aws-cloud',
        category: 'Cloud',
        title: 'AWS Cloud Computing',
        subtitle: 'Master the World\'s Leading Cloud Platform',
        description: 'Become an AWS-certified cloud professional. Design, deploy and manage scalable cloud infrastructure with hands-on real-world projects.',
        technologies: ['AWS EC2', 'S3', 'RDS', 'Lambda', 'CloudFormation', 'IAM', 'VPC'],
        duration: '14 Weeks',
        level: 'Beginner to Advanced',
        projects: 4,
        outcome: 'Cloud Solutions Architect',
        careerSupport: ['Certification Guidance', 'Resume Review', 'LinkedIn Profile', 'Placement Support'],
        featured: true,
        icon: 'cloud',
        price: 699
      },
      {
        id: 'devops',
        slug: 'devops',
        category: 'DevOps',
        title: 'DevOps Full Stack',
        subtitle: 'Automate, Deploy and Scale',
        description: 'Learn the complete DevOps toolchain from CI/CD to containerization and infrastructure-as-code. Build pipelines that real companies use.',
        technologies: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform', 'Ansible', 'Linux'],
        duration: '16 Weeks',
        level: 'Intermediate',
        projects: 5,
        outcome: 'DevOps Engineer',
        careerSupport: ['Resume Review', 'LinkedIn Optimization', 'Interview Prep', 'Placement Assistance'],
        featured: false,
        icon: 'git-branch',
        price: 749
      },
      {
        id: 'java-fullstack',
        slug: 'java-full-stack',
        category: 'Development',
        title: 'Java Full Stack Development',
        subtitle: 'Enterprise-Grade Development Skills',
        description: 'Master the complete Java ecosystem including Spring Boot backend and Angular/React frontend. Build production-ready enterprise applications.',
        technologies: ['Java', 'Spring Boot', 'Angular', 'React', 'MySQL', 'PostgreSQL', 'REST APIs'],
        duration: '20 Weeks',
        level: 'Beginner to Advanced',
        projects: 6,
        outcome: 'Full Stack Java Developer',
        careerSupport: ['Resume Building', 'LinkedIn Optimization', 'Interview Preparation', 'Placement Support'],
        featured: true,
        icon: 'layers',
        price: 849
      },
      {
        id: 'ui-ux-design',
        slug: 'ui-ux',
        category: 'Design',
        title: 'UI/UX Design',
        subtitle: 'Design That Solves Real Problems',
        description: 'Learn human-centered design from research to delivery. Create stunning, functional digital products that users love and businesses value.',
        technologies: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        duration: '12 Weeks',
        level: 'Beginner to Intermediate',
        projects: 4,
        outcome: 'Product Designer',
        careerSupport: ['Portfolio Review', 'LinkedIn Optimization', 'Interview Prep', 'Placement Support'],
        featured: false,
        icon: 'pen-tool',
        price: 599
      }
    ].map(c => this.enrichCourse(c as Course));
  }

  private saveCourses(courses: Course[]): void {
    this.coursesSubject.next(courses);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(courses));
      } catch (e) {
        console.error('Failed to write courses to localStorage', e);
      }
    }
  }

  getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  getCourseByIdOrSlug(idOrSlug: string): Observable<Course | undefined> {
    return this.courses$.pipe(
      map(courses => courses.find(c => c.id === idOrSlug || c.slug === idOrSlug))
    );
  }

  addCourse(course: Course): void {
    const current = this.coursesSubject.value;
    const enriched = this.enrichCourse(course);
    const updated = [enriched, ...current];
    this.saveCourses(updated);
  }

  updateCourse(id: string, updates: Partial<Course>): void {
    const current = this.coursesSubject.value;
    const index = current.findIndex(c => c.id === id);
    if (index !== -1) {
      const updatedList = [...current];
      updatedList[index] = { ...updatedList[index], ...updates };
      this.saveCourses(updatedList);
    }
  }

  toggleActiveStatus(id: string): void {
    const current = this.coursesSubject.value;
    const index = current.findIndex(c => c.id === id);
    if (index !== -1) {
      const updatedList = [...current];
      updatedList[index] = { ...updatedList[index], is_active: !updatedList[index].is_active };
      this.saveCourses(updatedList);
    }
  }
}
