import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ToastService } from './toast.service';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'hasura_auth_user';
  private readonly TOKEN_KEY = 'hasura_auth_token';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private toastService: ToastService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    let savedUser: User | null = null;
    if (this.isBrowser) {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          savedUser = JSON.parse(stored);
        }
      } catch (e) {
        console.error('Failed to parse saved user from localStorage', e);
      }
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(savedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  /**
   * Log in user with simulated credential validation
   */
  login(email: string, password: string, rememberMe = true): Observable<AuthResponse> {
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail.includes('admin') || cleanEmail.startsWith('admin@');
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: cleanEmail,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanEmail)}`,
      role: isAdmin ? 'admin' : 'student',
      createdAt: new Date().toISOString()
    };

    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'jwt_mock_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
    };

    return of(mockResponse).pipe(
      delay(800), // realistic network latency
      tap(res => {
        if (this.isBrowser && rememberMe) {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(res.user));
          localStorage.setItem(this.TOKEN_KEY, res.token);
        } else if (this.isBrowser) {
          sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(res.user));
          sessionStorage.setItem(this.TOKEN_KEY, res.token);
        }
        this.currentUserSubject.next(res.user);
        this.toastService.success('Welcome Back!', `Logged in successfully as ${res.user.name}`);
      })
    );
  }

  /**
   * Sign up new user
   */
  signup(name: string, email: string, password: string, role: 'student' | 'admin' = 'student'): Observable<AuthResponse> {
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = role === 'admin' || cleanEmail.includes('admin');
    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: cleanEmail,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanEmail)}`,
      role: isAdmin ? 'admin' : 'student',
      createdAt: new Date().toISOString()
    };

    const mockResponse: AuthResponse = {
      user: newUser,
      token: 'jwt_mock_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
    };

    return of(mockResponse).pipe(
      delay(900),
      tap(res => {
        if (this.isBrowser) {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(res.user));
          localStorage.setItem(this.TOKEN_KEY, res.token);
        }
        this.currentUserSubject.next(res.user);
        this.toastService.success('Account Created!', `Welcome to Hasura, ${res.user.name}!`);
      })
    );
  }

  /**
   * Request password reset link
   */
  forgotPassword(email: string): Observable<{ success: boolean; message: string }> {
    return of({
      success: true,
      message: `A password reset link and verification code have been dispatched to ${email}.`
    }).pipe(
      delay(750),
      tap(res => {
        this.toastService.info('Reset Link Sent', `Check your email (${email}) for instructions.`);
      })
    );
  }

  /**
   * Log out current user
   */
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.STORAGE_KEY);
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
    this.currentUserSubject.next(null);
    this.toastService.info('Signed Out', 'You have been safely signed out of Hasura.');
  }
}
