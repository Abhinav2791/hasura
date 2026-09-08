import { Component, AfterViewInit } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-projects-page',
  template: `
    <main id="main-content">
      <section class="section-dark section" style="padding-top: 160px; padding-bottom: 80px; position: relative; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(ellipse 70% 50% at 70% 50%, rgba(59,130,246,0.07) 0%, transparent 70%); pointer-events: none;" aria-hidden="true"></div>
        <div class="container" style="position: relative; z-index: 2;">
          <div class="animate-on-scroll" style="max-width: 680px;">
            <span class="section-eyebrow" style="color: var(--blue-400);">Enterprise Portfolio</span>
            <h1 style="font-family: var(--font-display); font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 900; color: var(--white); line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 24px;">
              Real Products.<br><span class="text-gradient">Measurable Impact.</span>
            </h1>
            <p style="font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.65); max-width: 520px;">
              Explore our production applications across retail, human resources, fintech, and healthcare technology. Built with microservices, scalable cloud architectures, and modern AI.
            </p>
          </div>
        </div>
      </section>

      <app-projects-section [showAll]="true"></app-projects-section>

      <!-- Engineering Standards Section -->
      <section class="section section-dark" style="padding: 90px 0; border-top: 1px solid rgba(255, 255, 255, 0.06);">
        <div class="container">
          <div class="section-header animate-on-scroll">
            <span class="section-eyebrow" style="color: var(--blue-400);">Engineering Philosophy</span>
            <h2 class="section-title">How Hasura Delivers <span class="text-gradient">Production Excellence.</span></h2>
            <p class="section-subtitle">Every application is engineered with high standards of security, uptime, and maintainability.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 48px;" class="animate-on-scroll">
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 28px;">
              <h3 style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px;">Microservices & Decoupling</h3>
              <p style="font-size: 14px; line-height: 1.65; color: rgba(255, 255, 255, 0.65); margin: 0;">Modular architectures designed to scale independently with zero single points of failure.</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 28px;">
              <h3 style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px;">Cloud Automation & IaC</h3>
              <p style="font-size: 14px; line-height: 1.65; color: rgba(255, 255, 255, 0.65); margin: 0;">Terraform and AWS CloudFormation scripts ensure repeatable, auditable cloud environments.</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 28px;">
              <h3 style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px;">Continuous Verification</h3>
              <p style="font-size: 14px; line-height: 1.65; color: rgba(255, 255, 255, 0.65); margin: 0;">Automated CI/CD testing pipelines ensuring every release meets strict performance benchmarks.</p>
            </div>
          </div>
        </div>
      </section>

      <app-tech-ecosystem></app-tech-ecosystem>
      <app-faq-section></app-faq-section>
      <app-final-cta></app-final-cta>
    </main>
  `,
  styles: []
})
export class ProjectsPageComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService) {}
  ngAfterViewInit(): void { setTimeout(() => this.scrollService.initScrollAnimations(), 100); }
}
