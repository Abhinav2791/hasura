export interface CurriculumModule {
  moduleNumber: number;
  title: string;
  duration: string;
  lessons: string[];
}

export interface CourseProject {
  title: string;
  description: string;
  tags: string[];
}

export interface CourseFaq {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug?: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  short_description?: string;
  technologies: string[];
  duration: string;
  level: string;
  projects: number;
  outcome: string;
  careerSupport: string[];
  featured: boolean;
  icon: string;
  price?: number;
  is_active?: boolean;
  whatYouWillLearn?: string[];
  curriculum?: CurriculumModule[];
  capstoneProjects?: CourseProject[];
  faqs?: CourseFaq[];
}
