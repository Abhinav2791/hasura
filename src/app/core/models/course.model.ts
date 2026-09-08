export interface Course {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  duration: string;
  level: string;
  projects: number;
  outcome: string;
  careerSupport: string[];
  featured: boolean;
  icon: string;
}
