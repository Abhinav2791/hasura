import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../core/models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-study-modal',
  templateUrl: './case-study-modal.component.html',
  styleUrls: ['./case-study-modal.component.scss']
})
export class CaseStudyModalComponent {
  @Input() project: Project | null = null;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClose(): void {
    this.close.emit();
  }

  consultProject(): void {
    this.onClose();
    this.router.navigate(['/contact'], {
      queryParams: { subject: 'Custom Software Development', project: this.project?.title }
    });
  }
}
