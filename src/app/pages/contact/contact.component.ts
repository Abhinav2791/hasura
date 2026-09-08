import { Component, AfterViewInit } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-contact-page',
  template: `
    <main id="main-content">
      <section class="section-dark section" style="padding-top: 160px; padding-bottom: 80px; position: relative; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 40% 50%, rgba(59,130,246,0.08) 0%, transparent 70%); pointer-events: none;" aria-hidden="true"></div>
        <div class="container" style="position: relative; z-index: 2;">
          <div class="animate-on-scroll text-center" style="max-width: 680px; margin: 0 auto;">
            <span class="section-eyebrow" style="color: var(--blue-400);">Connect With Us</span>
            <h1 style="font-family: var(--font-display); font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 900; color: var(--white); line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 24px;">
              Let's Build Something<br><span class="text-gradient">Remarkable.</span>
            </h1>
            <p style="font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.65);">
              Whether you have a new software project to architect, want to explore our training programs, or are ready to accelerate your tech career — our doors are open.
            </p>
          </div>
        </div>
      </section>

      <app-contact-section></app-contact-section>
      <app-faq-section></app-faq-section>
    </main>
  `,
  styles: []
})
export class ContactPageComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService) {}
  ngAfterViewInit(): void { setTimeout(() => this.scrollService.initScrollAnimations(), 100); }
}
