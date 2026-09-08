import { Component } from '@angular/core';

@Component({
  selector: 'app-what-hasura-does',
  templateUrl: './what-hasura-does.component.html',
  styleUrls: ['./what-hasura-does.component.scss']
})
export class WhatHasuraDoesComponent {
  pillars = [
    {
      number: '01',
      icon: 'build',
      title: 'BUILD',
      subtitle: 'Digital Products & Software',
      description: 'We design, architect and ship production-ready software — from intelligent web applications to enterprise systems and AI-powered platforms.',
      tags: ['Web Apps', 'Mobile', 'AI Products', 'Cloud Systems'],
      link: '/services'
    },
    {
      number: '02',
      icon: 'learn',
      title: 'LEARN',
      subtitle: 'Technology Training & Skills',
      description: 'Practical, industry-aligned training programs that build real skills through real projects — not just theory. Learn technologies that employers actually need.',
      tags: ['Generative AI', 'AWS', 'DevOps', 'Java', 'UI/UX'],
      link: '/courses'
    },
    {
      number: '03',
      icon: 'grow',
      title: 'GROW',
      subtitle: 'Career & Business Growth',
      description: 'From skill-building to career placement, from idea to launched product — Hasura is your long-term partner in technology-driven growth.',
      tags: ['Career Support', 'Placements', 'Consulting', 'Mentorship'],
      link: '/careers'
    }
  ];
}
