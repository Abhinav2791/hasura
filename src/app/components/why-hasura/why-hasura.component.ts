import { Component } from '@angular/core';

@Component({
  selector: 'app-why-hasura',
  templateUrl: './why-hasura.component.html',
  styleUrls: ['./why-hasura.component.scss']
})
export class WhyHasuraComponent {
  reasons = [
    {
      number: '01',
      title: 'Practical Learning',
      description: 'Skip the theory-heavy approach. Every lesson connects directly to real-world application and industry-relevant scenarios.',
      icon: 'target'
    },
    {
      number: '02',
      title: 'Real-World Projects',
      description: 'Build projects that actually work and solve real problems — portfolio-worthy work that demonstrates genuine competence.',
      icon: 'code'
    },
    {
      number: '03',
      title: 'Modern Technology',
      description: 'We teach and use the technologies that are shaping the future — not outdated frameworks or obsolete approaches.',
      icon: 'zap'
    },
    {
      number: '04',
      title: 'Experienced Mentors',
      description: 'Learn from industry professionals with real-world experience who bring context, depth and genuine insight to every session.',
      icon: 'users'
    },
    {
      number: '05',
      title: 'Career-Focused',
      description: 'Everything at Hasura is designed to translate into career and business outcomes — not just academic credentials.',
      icon: 'briefcase'
    },
    {
      number: '06',
      title: 'Long-Term Support',
      description: "Our relationship doesn't end when training ends. We provide ongoing mentorship, career guidance and professional support.",
      icon: 'shield'
    }
  ];
}
