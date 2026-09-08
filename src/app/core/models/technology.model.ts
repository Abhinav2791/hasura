export interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
}

export interface TechCategory {
  id: string;
  name: string;
  technologies: Technology[];
}
