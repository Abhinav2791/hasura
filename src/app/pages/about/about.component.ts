import { Component, AfterViewInit } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-about',
  template: `
    <main id="main-content" class="page-about">
      <!-- Hero -->
      <section class="page-hero section-dark section">
        <div class="container">
          <div class="page-hero__content animate-on-scroll">
            <span class="section-eyebrow" style="color: var(--blue-400);">Our Story & Mission</span>
            <h1 class="page-hero__title">
              Dream Big.<br>Build Bold.<br>
              <span class="text-gradient">Grow Together.</span>
            </h1>
            <p class="page-hero__desc">
              Hasura operates at the intersection of high-caliber software engineering and transformational career development. We turn raw curiosity into deployable engineering mastery.
            </p>
          </div>
        </div>
        <div class="page-hero__bg" aria-hidden="true">
          <div class="page-orb page-orb--1"></div>
          <div class="page-orb page-orb--2"></div>
        </div>
      </section>

      <!-- Story Section -->
      <section class="about-story section">
        <div class="container">
          <div class="about-grid animate-on-scroll">
            <div class="about-story__content">
              <span class="section-eyebrow">Who We Are</span>
              <h2 class="section-title">A Modern Technology Partner<br><span class="text-gradient">Engineered for Tomorrow.</span></h2>
              <p style="font-size: 16px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 20px;">
                Hasura is not an educational academy with outdated slideshows, nor is it a detached software development vendor. We are a unified technology accelerator.
              </p>
              <p style="font-size: 16px; line-height: 1.8; color: var(--text-secondary);">
                For businesses, we build and deliver cloud-native microservices, modern AI integrations, and intuitive digital interfaces. For engineers and career seekers, we provide the mentorship, production projects, and interview preparation required to thrive in top-tier tech environments.
              </p>
              <div style="display: flex; gap: 14px; margin-top: 32px; flex-wrap: wrap;">
                <a routerLink="/services" class="btn btn-primary">Enterprise Services</a>
                <a routerLink="/courses" class="btn btn-ghost">Training Programs</a>
              </div>
            </div>
            <div class="about-visual">
              <div class="about-visual__card">
                <div class="about-metric"><span class="big-number text-gradient">4+</span><span>Years of Innovation</span></div>
              </div>
              <div class="about-visual__card">
                <div class="about-metric"><span class="big-number text-gradient">500+</span><span>Engineers Transformed</span></div>
              </div>
              <div class="about-visual__card">
                <div class="about-metric"><span class="big-number text-gradient">50+</span><span>Production Platforms</span></div>
              </div>
              <div class="about-visual__card">
                <div class="about-metric"><span class="big-number text-gradient">12+</span><span>Core Tech Domains</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Three Pillars of Hasura -->
      <section class="pillars-values section section-dark">
        <div class="container">
          <div class="section-header animate-on-scroll">
            <span class="section-eyebrow" style="color: var(--blue-400);">Our Core Creed</span>
            <h2 class="section-title">The Three Pillars of <span class="text-gradient">HASURA</span></h2>
            <p class="section-subtitle">The guiding principles behind every line of code we write and every student we mentor.</p>
          </div>

          <div class="creed-grid animate-on-scroll">
            <div class="creed-card">
              <div class="creed-badge">DREAM</div>
              <h3>Vision & Ambition</h3>
              <p>We encourage relentless curiosity and bold thinking. We push clients and students to look past incremental fixes and pursue transformative technological leaps.</p>
            </div>
            <div class="creed-card">
              <div class="creed-badge creed-badge--blue">BUILD</div>
              <h3>Production Craftsmanship</h3>
              <p>Ideas without execution are meaningless. We emphasize clean code, robust architecture, test coverage, and continuous cloud deployment in everything we build.</p>
            </div>
            <div class="creed-card">
              <div class="creed-badge creed-badge--purple">GROW</div>
              <h3>Career & Business Scale</h3>
              <p>Success is measured by tangible outcomes: higher salaries, career breakthroughs, revenue growth, and scalable digital platforms built to endure.</p>
            </div>
          </div>
        </div>
      </section>

      <app-why-hasura></app-why-hasura>
      <app-career-support></app-career-support>
      <app-tech-ecosystem></app-tech-ecosystem>
      <app-faq-section></app-faq-section>
      <app-final-cta></app-final-cta>
    </main>
  `,
  styles: [`
    .page-about { }
    .page-hero {
      padding-top: 160px; padding-bottom: 100px; position: relative; overflow: hidden;
      &__content { position: relative; z-index: 2; max-width: 680px; display: flex; flex-direction: column; gap: 24px; }
      &__title { font-family: var(--font-display); font-size: clamp(3rem, 6vw, 5rem); font-weight: 900; color: var(--white); line-height: 1.05; letter-spacing: -0.03em; }
      &__desc { font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.55); max-width: 520px; }
      &__bg { position: absolute; inset: 0; pointer-events: none; }
    }
    .page-orb {
      position: absolute; border-radius: 50%; filter: blur(80px);
      &--1 { width: 500px; height: 500px; top: -100px; right: -100px; background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%); }
      &--2 { width: 400px; height: 400px; bottom: -100px; left: -50px; background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%); }
    }
    .about-story { background: var(--white); }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; @media (max-width: 900px) { grid-template-columns: 1fr; gap: 48px; } }
    .about-story__content { display: flex; flex-direction: column; gap: 16px; }
    .about-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; &__card { background: var(--off-white); border: 1px solid var(--gray-100); border-radius: 16px; padding: 28px; transition: all var(--transition-base); &:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: rgba(59,130,246,0.1); } } }
    .about-metric { display: flex; flex-direction: column; gap: 6px; .big-number { font-family: var(--font-display); font-size: 2.5rem; font-weight: 900; line-height: 1; } span { font-size: 13px; color: var(--text-muted); font-weight: 600; } }

    .pillars-values {
      padding: 100px 0;
    }
    .creed-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-top: 48px;
      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }
    .creed-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 36px 28px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: all 0.3s ease;
      &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(59, 130, 246, 0.3);
        transform: translateY(-4px);
      }
      .creed-badge {
        font-family: var(--font-display);
        font-size: 13px;
        font-weight: 900;
        letter-spacing: 0.15em;
        color: var(--blue-400);
        background: rgba(59, 130, 246, 0.12);
        padding: 4px 12px;
        border-radius: 6px;
        align-self: flex-start;
        &--purple {
          color: #C084FC;
          background: rgba(124, 58, 237, 0.15);
        }
      }
      h3 {
        font-family: var(--font-display);
        font-size: 20px;
        font-weight: 800;
        color: var(--white);
      }
      p {
        font-size: 14px;
        line-height: 1.7;
        color: rgba(255, 255, 255, 0.65);
      }
    }
  `]
})
export class AboutComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService) {}
  ngAfterViewInit(): void { setTimeout(() => this.scrollService.initScrollAnimations(), 100); }
}
