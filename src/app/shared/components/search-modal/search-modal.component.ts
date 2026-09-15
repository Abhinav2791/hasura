import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface SearchResult {
  category: 'Course' | 'Service' | 'Project' | 'Page';
  title: string;
  subtitle: string;
  route: string;
  queryParams?: any;
}

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  query = '';
  selectedIndex = 0;

  allItems: SearchResult[] = [
    // Courses
    { category: 'Course', title: 'Generative AI Engineering', subtitle: 'LLMs, RAG, LangChain, Vector DBs, Python', route: '/courses' },
    { category: 'Course', title: 'AWS Cloud Computing', subtitle: 'Cloud Architecture, EC2, Lambda, S3, IAM, Terraform', route: '/courses' },
    { category: 'Course', title: 'DevOps Full Stack', subtitle: 'Docker, Kubernetes, CI/CD pipelines, Ansible', route: '/courses' },
    { category: 'Course', title: 'Java Full Stack Development', subtitle: 'Spring Boot, Angular, React, PostgreSQL, Microservices', route: '/courses' },
    { category: 'Course', title: 'UI/UX Design Systems', subtitle: 'Figma, User Research, Prototyping, Design Systems', route: '/courses' },

    // Services
    { category: 'Service', title: 'Enterprise Software Development', subtitle: 'Scalable web and mobile applications for modern business', route: '/services' },
    { category: 'Service', title: 'AI & Generative AI Solutions', subtitle: 'Custom AI integration, RAG pipelines, intelligent workflows', route: '/services' },
    { category: 'Service', title: 'AWS & Cloud Architecture', subtitle: 'Cloud migration, serverless infrastructure, cost optimization', route: '/services' },
    { category: 'Service', title: 'DevOps & Pipeline Automation', subtitle: 'Zero-downtime CI/CD deployment, Kubernetes management', route: '/services' },
    { category: 'Service', title: 'Technology Consulting & Audits', subtitle: 'System architecture reviews, technical roadmap strategy', route: '/services' },

    // Projects
    { category: 'Project', title: 'E-Commerce Intelligence Platform', subtitle: 'ML recommendations, inventory synchronization', route: '/projects' },
    { category: 'Project', title: 'AI-Powered HR Management System', subtitle: 'Automated candidate screening & talent analytics', route: '/projects' },
    { category: 'Project', title: 'Cloud-Native Fintech Platform', subtitle: 'High-concurrency payment engine on AWS microservices', route: '/projects' },
    { category: 'Project', title: 'Healthcare Telemedicine Portal', subtitle: 'HIPAA-compliant video consultation & patient monitoring', route: '/projects' },

    // Pages
    { category: 'Page', title: 'About Hasura', subtitle: 'Our mission, methodology, leadership values and story', route: '/about' },
    { category: 'Page', title: 'Training & Career Programs', subtitle: 'Industry-ready technology education and mentorship', route: '/training' },
    { category: 'Page', title: 'Careers at Hasura', subtitle: 'Open engineering, AI, design, and mentorship positions', route: '/careers' },
    { category: 'Page', title: 'Contact & Consultations', subtitle: 'Schedule a discovery call or inquiry with our leadership', route: '/contact' }
  ];

  get filteredResults(): SearchResult[] {
    if (!this.query.trim()) {
      return this.allItems.slice(0, 8);
    }
    const q = this.query.toLowerCase().trim();
    return this.allItems.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('open-search', () => this.toggleModal());
    }
  }

  @HostListener('window:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent): void {
    // Ctrl+K or Cmd+K
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.toggleModal();
    }
    // Escape key closes modal
    if (event.key === 'Escape' && this.isOpen) {
      this.closeModal();
    }
    // Arrow Navigation
    if (this.isOpen) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredResults.length;
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + this.filteredResults.length) % this.filteredResults.length;
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (this.filteredResults[this.selectedIndex]) {
          this.selectItem(this.filteredResults[this.selectedIndex]);
        }
      }
    }
  }

  toggleModal(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.query = '';
      this.selectedIndex = 0;
      setTimeout(() => {
        const input = document.getElementById('search-palette-input');
        if (input) input.focus();
      }, 50);
    }
  }

  closeModal(): void {
    this.isOpen = false;
  }

  selectItem(item: SearchResult): void {
    this.closeModal();
    this.router.navigate([item.route]);
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('open-search', () => this.toggleModal());
    }
  }
}
