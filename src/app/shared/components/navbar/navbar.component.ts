import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

interface NavLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  navLinks: NavLink[] = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Services', route: '/services' },
    { label: 'Training', route: '/training' },
    { label: 'Projects', route: '/projects' },
    { label: 'Careers', route: '/careers' },
    { label: 'Contact', route: '/contact' },
  ];

  isScrolled = false;
  isMobileMenuOpen = false;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 40;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isBrowser) {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  openSearch(): void {
    if (this.isBrowser) {
      window.dispatchEvent(new CustomEvent('open-search'));
    }
  }

  navigateTo(route: string): void {
    this.closeMobileMenu();
    this.router.navigate([route]);
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }
}
