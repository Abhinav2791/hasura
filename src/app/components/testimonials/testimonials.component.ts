import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Testimonial } from '../../core/models/testimonial.model';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];
  activeIndex = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTestimonials().subscribe(data => {
      this.testimonials = data;
    });
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

  prev(): void {
    this.activeIndex = this.activeIndex === 0 ? this.testimonials.length - 1 : this.activeIndex - 1;
  }

  next(): void {
    this.activeIndex = this.activeIndex === this.testimonials.length - 1 ? 0 : this.activeIndex + 1;
  }

  getRatingArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
