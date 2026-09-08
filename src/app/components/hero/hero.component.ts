import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {

  isBrowser: boolean;
  private animFrameId: number | null = null;
  private boundMouseHandler!: EventListener;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initParallax();
    }
  }

  private initParallax(): void {
    const hero = document.querySelector('.hero') as HTMLElement;
    if (!hero) return;

    this.boundMouseHandler = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const x = (mouseEvent.clientX / window.innerWidth - 0.5) * 20;
      const y = (mouseEvent.clientY / window.innerHeight - 0.5) * 10;
      const orbs = hero.querySelectorAll<HTMLElement>('.hero__orb');
      orbs.forEach((orb: HTMLElement, i: number) => {
        const factor = (i + 1) * 0.5;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    hero.addEventListener('mousemove', this.boundMouseHandler);
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.boundMouseHandler) {
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.removeEventListener('mousemove', this.boundMouseHandler);
      }
    }
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
  }
}
