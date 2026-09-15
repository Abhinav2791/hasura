import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  submitted = false;

  passwordStrength = 0; // 0 to 4
  passwordStrengthLabel = '';
  passwordStrengthClass = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/']);
    }

    this.signupForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
          ]
        ],
        confirmPassword: ['', [Validators.required]],
        agreeTerms: [false, [Validators.requiredTrue]]
      },
      {
        validators: this.passwordMatchValidator
      }
    );

    // Watch password changes to compute strength
    this.signupForm.get('password')?.valueChanges.subscribe(val => {
      this.calculatePasswordStrength(val || '');
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    if (password && confirm && password !== confirm) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  calculatePasswordStrength(password: string): void {
    if (!password) {
      this.passwordStrength = 0;
      this.passwordStrengthLabel = '';
      this.passwordStrengthClass = '';
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score++;

    this.passwordStrength = score;

    switch (score) {
      case 1:
        this.passwordStrengthLabel = 'Weak';
        this.passwordStrengthClass = 'strength--weak';
        break;
      case 2:
        this.passwordStrengthLabel = 'Fair';
        this.passwordStrengthClass = 'strength--fair';
        break;
      case 3:
        this.passwordStrengthLabel = 'Good';
        this.passwordStrengthClass = 'strength--good';
        break;
      case 4:
        this.passwordStrengthLabel = 'Strong & Secure';
        this.passwordStrengthClass = 'strength--strong';
        break;
      default:
        this.passwordStrengthLabel = 'Very Weak';
        this.passwordStrengthClass = 'strength--weak';
        break;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.toastService.warning('Required Fields', 'Please complete the form requirements and accept our terms.');
      return;
    }

    this.isLoading = true;
    const { fullName, email, password } = this.signupForm.value;

    this.authService.signup(fullName, email, password).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.error('Registration Failed', 'An error occurred during account creation.');
      }
    });
  }

  signUpWithOAuth(provider: string): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      const demoName = provider === 'Google' ? 'Google Developer' : 'GitHub Builder';
      const demoEmail = provider === 'Google' ? 'developer@gmail.com' : 'builder@github.com';
      this.authService.signup(demoName, demoEmail, 'OAuthSimulated123!').subscribe(() => {
        this.router.navigate(['/']);
      });
    }, 850);
  }
}
