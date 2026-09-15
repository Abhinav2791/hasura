import { Component } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(private toastService: ToastService) {}

  companyLinks = [
    { label: 'About Us', route: '/about' },
    { label: 'Projects', route: '/projects' },
    { label: 'Careers', route: '/careers' },
    { label: 'Contact', route: '/contact' },
    { label: 'Log In', route: '/login' },
    { label: 'Create Account', route: '/signup' },
  ];

  serviceLinks = [
    { label: 'AI & Generative AI', route: '/services' },
    { label: 'Software Development', route: '/services' },
    { label: 'Cloud & DevOps', route: '/services' },
    { label: 'UI/UX Design', route: '/services' },
  ];

  trainingLinks = [
    { label: 'Generative AI', route: '/courses' },
    { label: 'AWS Cloud', route: '/courses' },
    { label: 'DevOps Full Stack', route: '/courses' },
    { label: 'Java Full Stack', route: '/courses' },
    { label: 'UI/UX Design', route: '/courses' },
  ];

  socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com', icon: 'github' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
    { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  ];

  showLegalNotice(docName: string, event: Event): void {
    event.preventDefault();
    this.toastService.info(
      `${docName}`,
      `Hasura Technologies operates in full compliance with enterprise privacy standards and data protection guidelines.`
    );
  }
}

