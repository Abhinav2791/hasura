import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Career } from '../../core/models/career.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.scss']
})
export class ApplyModalComponent implements OnChanges {
  @Input() career: Career | null = null;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  applyForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.applyForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{10,15}$/)]],
      experience: ['1-3 Years', Validators.required],
      portfolioUrl: [''],
      resumeLink: ['', Validators.required],
      coverNote: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.isSuccess = false;
    }
  }

  onClose(): void {
    this.close.emit();
    this.isSuccess = false;
  }

  onSubmit(): void {
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;
      this.isSuccess = true;
      this.toastService.success(
        'Application Received!',
        `Your application for ${this.career?.title} has been logged. Our talent team will review your profile shortly.`
      );
      this.applyForm.reset({ experience: '1-3 Years' });
    }, 1000);
  }
}
