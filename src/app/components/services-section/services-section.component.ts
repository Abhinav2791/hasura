import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from '../../core/services/data.service';
import { Service } from '../../core/models/service.model';

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.scss']
})
export class ServicesSectionComponent implements OnInit {
  services: Service[] = [];

  private iconMap: { [key: string]: string } = {
    'brain': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a6 6 0 00-6 6v1a1 1 0 001 1h10a1 1 0 001-1V8a6 6 0 00-6-6z"/><path d="M12 13v9"/><path d="M9 22h6"/><path d="M9 13H6a3 3 0 000 6h3"/><path d="M15 13h3a3 3 0 010 6h-3"/></svg>`,
    'code-2': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    'monitor-smartphone': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    'cloud': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>`,
    'pen-tool': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
    'lightbulb': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>`
  };

  // Gradient accent colors per service index
  accentColors = [
    'var(--blue-500)',
    'var(--violet-600)',
    '#06B6D4',
    '#10B981',
    '#F59E0B',
    '#EC4899'
  ];

  accentSofts = [
    'rgba(59,130,246,0.12)',
    'rgba(124,58,237,0.12)',
    'rgba(6,182,212,0.12)',
    'rgba(16,185,129,0.12)',
    'rgba(245,158,11,0.12)',
    'rgba(236,72,153,0.12)',
  ];

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.dataService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  getIcon(iconName: string): SafeHtml {
    const svg = this.iconMap[iconName] || this.iconMap['code-2'];
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  getAccentColor(index: number): string {
    return this.accentColors[index % this.accentColors.length];
  }

  getAccentSoft(index: number): string {
    return this.accentSofts[index % this.accentSofts.length];
  }
}
