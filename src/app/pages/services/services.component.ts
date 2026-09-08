import { Component, AfterViewInit } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-services-page',
  template: `
    <main id="main-content">
      <section class="page-hero section-dark section" style="padding-top: 160px; padding-bottom: 80px; position: relative; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 70% 50%, rgba(59,130,246,0.08) 0%, transparent 70%); pointer-events: none;" aria-hidden="true"></div>
        <div class="container" style="position: relative; z-index: 2;">
          <div class="animate-on-scroll" style="max-width: 720px;">
            <span class="section-eyebrow" style="color: var(--blue-400);">Enterprise Services</span>
            <h1 style="font-family: var(--font-display); font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 900; color: var(--white); line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 24px;">
              Technology Services<br><span class="text-gradient">Built to Scale.</span>
            </h1>
            <p style="font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.65); max-width: 540px;">
              From custom software engineering and AI integration to AWS cloud infrastructure and DevOps automation — we engineer solutions that drive growth.
            </p>
          </div>
        </div>
      </section>

      <app-services-section></app-services-section>

      <!-- Engagement Models -->
      <section class="section section-dark" style="padding: 100px 0; border-top: 1px solid rgba(255, 255, 255, 0.06);">
        <div class="container">
          <div class="section-header animate-on-scroll">
            <span class="section-eyebrow" style="color: var(--blue-400);">Flexible Collaboration</span>
            <h2 class="section-title">How We Partner <span class="text-gradient">With Your Team.</span></h2>
            <p class="section-subtitle">Choose the engagement model that matches your product timeline, team structure, and budget.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-top: 48px;" class="animate-on-scroll">
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 32px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 800; color: var(--blue-400); text-transform: uppercase; letter-spacing: 0.08em;">Model 01</span>
              <h3 style="font-size: 18px; font-weight: 700; color: #fff;">Fixed-Scope Projects</h3>
              <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.65); margin: 0;">Defined milestones, clear deliverables, guaranteed timelines, and upfront pricing for MVP or new feature builds.</p>
            </div>

            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 32px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 800; color: #A78BFA; text-transform: uppercase; letter-spacing: 0.08em;">Model 02</span>
              <h3 style="font-size: 18px; font-weight: 700; color: #fff;">Dedicated Engineering Pods</h3>
              <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.65); margin: 0;">Autonomous agile squads (Tech Lead, Senior Developers, DevOps, QA) seamlessly integrated into your sprint cycles.</p>
            </div>

            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 32px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 800; color: #34D399; text-transform: uppercase; letter-spacing: 0.08em;">Model 03</span>
              <h3 style="font-size: 18px; font-weight: 700; color: #fff;">Architecture & Cloud Advisory</h3>
              <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.65); margin: 0;">Senior architects conduct code audits, cloud cost optimization, security hardening, and technology roadmap reviews.</p>
            </div>

            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 32px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 800; color: #FBBF24; text-transform: uppercase; letter-spacing: 0.08em;">Model 04</span>
              <h3 style="font-size: 18px; font-weight: 700; color: #fff;">Corporate Tech Upskilling</h3>
              <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.65); margin: 0;">Custom enterprise training sprints in Generative AI, Cloud Migration, and DevOps tailored to your company stack.</p>
            </div>
          </div>
        </div>
      </section>

      <app-ai-section></app-ai-section>
      <app-tech-ecosystem></app-tech-ecosystem>
      <app-faq-section></app-faq-section>
      <app-final-cta></app-final-cta>
    </main>
  `,
  styles: []
})
export class ServicesPageComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService) {}
  ngAfterViewInit(): void { setTimeout(() => this.scrollService.initScrollAnimations(), 100); }
}
