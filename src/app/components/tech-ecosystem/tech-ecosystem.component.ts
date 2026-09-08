import { Component } from '@angular/core';

@Component({
  selector: 'app-tech-ecosystem',
  templateUrl: './tech-ecosystem.component.html',
  styleUrls: ['./tech-ecosystem.component.scss']
})
export class TechEcosystemComponent {
  categories = [
    {
      id: 'frontend',
      name: 'Frontend',
      techs: [
        { name: 'Angular', abbr: 'Ng', desc: 'Enterprise-grade TypeScript framework' },
        { name: 'React', abbr: 'Re', desc: 'UI library for component-based interfaces' },
        { name: 'Next.js', abbr: 'Nx', desc: 'React framework for production with SSR' },
        { name: 'TypeScript', abbr: 'TS', desc: 'Type-safe JavaScript for large-scale apps' },
        { name: 'Tailwind', abbr: 'TW', desc: 'Utility-first CSS framework' },
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      techs: [
        { name: 'Java', abbr: 'Jv', desc: 'Robust, enterprise-grade programming language' },
        { name: 'Spring Boot', abbr: 'SB', desc: 'Production-ready Java framework' },
        { name: 'Node.js', abbr: 'No', desc: 'JavaScript runtime for server-side apps' },
        { name: 'Python', abbr: 'Py', desc: 'Versatile language for APIs and AI' },
      ]
    },
    {
      id: 'database',
      name: 'Database',
      techs: [
        { name: 'PostgreSQL', abbr: 'PG', desc: 'Advanced open-source relational database' },
        { name: 'MySQL', abbr: 'My', desc: "World's most popular open-source database" },
        { name: 'MongoDB', abbr: 'Mo', desc: 'Flexible NoSQL document database' },
        { name: 'Redis', abbr: 'Rd', desc: 'In-memory store for caching' },
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud',
      techs: [
        { name: 'AWS', abbr: 'AWS', desc: "World's leading cloud platform" },
        { name: 'Azure', abbr: 'Az', desc: "Microsoft's enterprise cloud" },
      ]
    },
    {
      id: 'devops',
      name: 'DevOps',
      techs: [
        { name: 'Docker', abbr: 'Dk', desc: 'Container platform for deployments' },
        { name: 'Kubernetes', abbr: 'K8s', desc: 'Container orchestration for production' },
        { name: 'Terraform', abbr: 'Tf', desc: 'Infrastructure as code' },
        { name: 'Jenkins', abbr: 'Je', desc: 'Open-source CI/CD automation' },
        { name: 'GH Actions', abbr: 'GA', desc: 'Automate workflows from your repo' },
      ]
    },
    {
      id: 'ai',
      name: 'AI & ML',
      techs: [
        { name: 'OpenAI', abbr: 'OAI', desc: 'Leading generative AI APIs' },
        { name: 'LangChain', abbr: 'LC', desc: 'Framework for LLM applications' },
        { name: 'RAG', abbr: 'RAG', desc: 'Retrieval-Augmented Generation' },
        { name: 'Vector DBs', abbr: 'VDB', desc: 'Semantic search at scale' },
      ]
    }
  ];

  activeCategory = 'all';
  hoveredTech: string | null = null;

  setCategory(id: string): void {
    this.activeCategory = id;
  }

  get visibleCategories() {
    if (this.activeCategory === 'all') return this.categories;
    return this.categories.filter(c => c.id === this.activeCategory);
  }
}
