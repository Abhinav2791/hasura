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

  // Typewriter
  words = ['Dream It.', 'Build It.', 'Ship It.', 'Scale It.'];
  currentWordIndex = 0;
  displayText = '';
  private typeInterval: any;
  private isDeleting = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initParallax();
      this.startTypewriter();
    }
  }

  private startTypewriter(): void {
    const word = this.words[this.currentWordIndex];
    const speed = this.isDeleting ? 60 : 110;

    if (!this.isDeleting && this.displayText.length < word.length) {
      this.displayText = word.substring(0, this.displayText.length + 1);
    } else if (this.isDeleting && this.displayText.length > 0) {
      this.displayText = word.substring(0, this.displayText.length - 1);
    } else if (!this.isDeleting && this.displayText.length === word.length) {
      // Pause at full word
      this.typeInterval = setTimeout(() => {
        this.isDeleting = true;
        this.startTypewriter();
      }, 1800);
      return;
    } else if (this.isDeleting && this.displayText.length === 0) {
      this.isDeleting = false;
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
    }

    this.typeInterval = setTimeout(() => this.startTypewriter(), speed);
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
    if (this.typeInterval) {
      clearTimeout(this.typeInterval);
    }
  }
}
