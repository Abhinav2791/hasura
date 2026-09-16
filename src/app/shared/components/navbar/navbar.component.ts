import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';

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
    { label: 'Solutions', route: '/solutions' },
    { label: 'Training', route: '/training' },
    { label: 'Projects', route: '/projects' },
    { label: 'Careers', route: '/careers' },
    { label: 'Contact', route: '/contact' },
  ];

  isScrolled = false;
  isMobileMenuOpen = false;
  isGetStartedOpen = false;
  isUserMenuOpen = false;
  isBrowser: boolean;
  currentUser$: Observable<User | null>;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    public authService: AuthService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 40;
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeGetStarted();
    this.isUserMenuOpen = false;
  }

  toggleGetStarted(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isGetStartedOpen = !this.isGetStartedOpen;
    this.isUserMenuOpen = false;
  }

  closeGetStarted(): void {
    this.isGetStartedOpen = false;
  }

  toggleUserMenu(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isUserMenuOpen = !this.isUserMenuOpen;
    this.isGetStartedOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isBrowser) {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isGetStartedOpen = false;
    this.isUserMenuOpen = false;
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

  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }
}
