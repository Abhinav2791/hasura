import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotForm!: FormGroup;
  isLoading = false;
  submitted = false;
  isSent = false;
  sentEmail = '';

  resendCooldown = 0;
  private timerInterval: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.forgotForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.forgotForm.invalid) {
      this.toastService.warning('Required', 'Please enter a valid email address.');
      return;
    }

    this.isLoading = true;
    const email = this.forgotForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSent = true;
        this.sentEmail = email;
        this.startResendCooldown();
      },
      error: () => {
        this.isLoading = false;
        this.toastService.error('Error', 'Unable to process reset request. Please try again.');
      }
    });
  }

  startResendCooldown(): void {
    this.resendCooldown = 60;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.resendCooldown > 0) {
        this.resendCooldown--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  resendEmail(): void {
    if (this.resendCooldown > 0 || !this.sentEmail) return;

    this.isLoading = true;
    this.authService.forgotPassword(this.sentEmail).subscribe({
      next: () => {
        this.isLoading = false;
        this.startResendCooldown();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  resetState(): void {
    this.isSent = false;
    this.submitted = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.resendCooldown = 0;
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
