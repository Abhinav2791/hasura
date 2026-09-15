import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Testimonial } from '../../core/models/testimonial.model';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [];
  activeIndex = 0;
  private autoplayTimer: any;
  autoplayInterval = 5000;
  isPaused = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTestimonials().subscribe(data => {
      this.testimonials = data;
      this.startAutoplay();
    });
  }

  private startAutoplay(): void {
    this.clearAutoplay();
    if (this.testimonials.length < 2) return;
    this.autoplayTimer = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoplayInterval);
  }

  private clearAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  setActive(index: number): void {
    this.activeIndex = index;
    this.isPaused = true;
    this.clearAutoplay();
    // Resume after 10s of inactivity
    setTimeout(() => {
      this.isPaused = false;
      this.startAutoplay();
    }, 10000);
  }

  prev(): void {
    this.activeIndex = this.activeIndex === 0
      ? this.testimonials.length - 1
      : this.activeIndex - 1;
    this.setActive(this.activeIndex);
  }

  next(): void {
    this.activeIndex = this.activeIndex === this.testimonials.length - 1
      ? 0
      : this.activeIndex + 1;
  }

  getRatingArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  get progressPercent(): number {
    if (!this.testimonials.length) return 0;
    return ((this.activeIndex + 1) / this.testimonials.length) * 100;
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
  }
}
