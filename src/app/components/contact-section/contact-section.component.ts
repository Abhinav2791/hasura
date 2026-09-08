import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent {
  contactForm: FormGroup;
  formState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  helpOptions = [
    'Software Development',
    'AI & Generative AI',
    'Cloud & DevOps',
    'Technology Training',
    'Career Support',
    'UI/UX Design',
    'Technology Consulting',
    'Other'
  ];

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  get f() { return this.contactForm.controls; }

  isInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.formState = 'loading';

    // Simulate API call
    setTimeout(() => {
      this.formState = 'success';
      this.toastService.success(
        'Inquiry Dispatched!',
        'Thank you! A Hasura technology advisor will connect with you within 24 hours.'
      );
      this.contactForm.reset();
    }, 1200);
  }

  resetForm(): void {
    this.formState = 'idle';
    this.contactForm.reset();
  }
}
