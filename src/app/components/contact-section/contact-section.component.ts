import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private contactService: ContactService,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['subject']) {
        const matched = this.helpOptions.find(
          opt => opt.toLowerCase() === params['subject'].toLowerCase()
        );
        if (matched) {
          this.contactForm.patchValue({ subject: matched });
        }
      }
      if (params['project']) {
        this.contactForm.patchValue({
          message: `Inquiring about project scope similar to: ${params['project']}. `
        });
      }
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
    const formVal = this.contactForm.value;

    this.contactService.submit({
      name: formVal.name,
      email: formVal.email,
      phone: formVal.phone,
      company: formVal.company,
      service: formVal.subject,
      message: formVal.message
    }).subscribe({
      next: () => {
        this.formState = 'success';
        this.contactForm.reset();
      },
      error: () => {
        this.formState = 'error';
        this.toastService.error(
          'Transmission Issue',
          'We could not send your message right now. Please try again or email us directly.'
        );
      }
    });
  }

  resetForm(): void {
    this.formState = 'idle';
    this.contactForm.reset();
  }
}
