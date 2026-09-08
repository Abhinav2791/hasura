import { Component, AfterViewInit } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-courses-page',
  template: `
    <main id="main-content">
      <section class="section-dark section" style="padding-top: 160px; padding-bottom: 80px; position: relative; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 50% 30%, rgba(59,130,246,0.08) 0%, transparent 70%); pointer-events: none;" aria-hidden="true"></div>
        <div class="container" style="position: relative; z-index: 2;">
          <div class="animate-on-scroll text-center" style="max-width: 720px; margin: 0 auto;">
            <span class="section-eyebrow" style="color: var(--blue-400);">Professional Programs</span>
            <h1 style="font-family: var(--font-display); font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 900; color: var(--white); line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 24px;">
              Industry-Grade<br><span class="text-gradient">Technology Programs.</span>
            </h1>
            <p style="font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.65);">
              Master in-demand technology domains with live mentor guidance, production-grade projects, and dedicated career placement support.
            </p>
          </div>
        </div>
      </section>

      <app-training-section></app-training-section>
      <app-career-support></app-career-support>
      <app-learn-build-grow></app-learn-build-grow>
      <app-testimonials></app-testimonials>
      <app-faq-section></app-faq-section>
      <app-final-cta></app-final-cta>
    </main>
  `,
  styles: []
})
export class CoursesPageComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService) {}
  ngAfterViewInit(): void { setTimeout(() => this.scrollService.initScrollAnimations(), 100); }
}
