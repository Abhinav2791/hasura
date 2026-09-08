import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-build-grow',
  templateUrl: './learn-build-grow.component.html',
  styleUrls: ['./learn-build-grow.component.scss']
})
export class LearnBuildGrowComponent {
  stages = [
    {
      step: 'LEARN',
      icon: 'book',
      title: 'Master Relevant Technologies',
      description: 'Deep, practical training in the technologies that matter. Not surface-level tutorials — real skills that employers actually want.',
      points: ['Industry-aligned curriculum', 'Hands-on labs and exercises', 'Expert mentorship', 'Regular assessments'],
      color: 'blue'
    },
    {
      step: 'BUILD',
      icon: 'code',
      title: 'Create Real-World Projects',
      description: 'Apply what you learn by building production-grade projects that solve actual problems — not contrived exercises.',
      points: ['Production-grade projects', 'Code reviews by mentors', 'Portfolio-worthy work', 'Team collaboration experience'],
      color: 'violet'
    },
    {
      step: 'GROW',
      icon: 'rocket',
      title: 'Develop Your Career',
      description: 'Translate skills and projects into career opportunities with dedicated placement support and professional development.',
      points: ['Resume & LinkedIn optimization', 'Interview preparation', 'Mock interviews with feedback', 'Career placement assistance'],
      color: 'cyan'
    }
  ];
}
