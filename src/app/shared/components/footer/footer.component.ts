import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  companyLinks = [
    { label: 'About Us', route: '/about' },
    { label: 'Projects', route: '/projects' },
    { label: 'Careers', route: '/careers' },
    { label: 'Contact', route: '/contact' },
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
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'GitHub', href: '#', icon: 'github' },
    { label: 'Twitter', href: '#', icon: 'twitter' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
  ];
}
