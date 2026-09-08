import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Metric {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-trust-strip',
  templateUrl: './trust-strip.component.html',
  styleUrls: ['./trust-strip.component.scss']
})
export class TrustStripComponent implements OnInit, AfterViewInit {

  metrics: Metric[] = [
    { value: 50, suffix: '+', label: 'Projects', description: 'Real-world digital products built' },
    { value: 12, suffix: '+', label: 'Tech Domains', description: 'Specializations across technology' },
    { value: 500, suffix: '+', label: 'Learners', description: 'Professionals upskilled' },
    { value: 95, suffix: '%', label: 'Success Rate', description: 'Project completion rate' },
    { value: 4, suffix: '+', label: 'Years', description: 'Of technology innovation' },
  ];

  displayValues: number[] = [];
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.displayValues = this.metrics.map(() => 0);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initCounterAnimation();
    }
  }

  private initCounterAnimation(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const el = document.querySelector('.trust-strip');
    if (el) observer.observe(el);
  }

  private animateCounters(): void {
    this.metrics.forEach((metric, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = metric.value / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), metric.value);
        this.displayValues[index] = current;

        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    });
  }
}
