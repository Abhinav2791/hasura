import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // If user is already authenticated, redirect to home
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [true]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.toastService.warning('Validation Error', 'Please check your email and password.');
      return;
    }

    this.isLoading = true;
    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password, rememberMe).subscribe({
      next: (res) => {
        this.isLoading = false;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || (res.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.error('Sign In Failed', 'Invalid credentials. Please try again.');
      }
    });
  }

  quickFillDemo(role: 'developer' | 'student'): void {
    if (role === 'developer') {
      this.loginForm.patchValue({
        email: 'alex.chen@hasura.tech',
        password: 'Password123!',
        rememberMe: true
      });
    } else {
      this.loginForm.patchValue({
        email: 'priya.sharma@gmail.com',
        password: 'Password123!',
        rememberMe: true
      });
    }
  }

  loginWithOAuth(provider: string): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      const demoEmail = provider === 'Google' ? 'developer@gmail.com' : 'builder@github.com';
      this.authService.login(demoEmail, 'OAuthSimulated123!', true).subscribe(() => {
        this.router.navigate(['/']);
      });
    }, 800);
  }
}
