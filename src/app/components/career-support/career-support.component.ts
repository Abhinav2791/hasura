import { Component } from '@angular/core';

interface Pillar {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

interface Step {
  step: string;
  title: string;
  duration: string;
  desc: string;
}

@Component({
  selector: 'app-career-support',
  templateUrl: './career-support.component.html',
  styleUrls: ['./career-support.component.scss']
})
export class CareerSupportComponent {
  pillars: Pillar[] = [
    {
      icon: 'file-text',
      title: 'ATS-Optimized Resumes & Portfolios',
      subtitle: 'Engineered to Pass Enterprise Screens',
      description: 'We don\'t just edit resumes; we craft high-impact technical resumes with quantifiable project outcomes that pass automated ATS algorithms and impress Engineering Managers.',
      features: [
        'ATS-compliant typography and keyword scoring',
        'Live production project architecture showcases',
        'GitHub repository curation and clean commit history',
        'Direct 1-on-1 resume audit with senior engineering leads'
      ]
    },
    {
      icon: 'linkedin',
      title: 'LinkedIn & Personal Brand Curation',
      subtitle: 'Turn Your Profile into an Inbound Magnet',
      description: 'Learn how to attract recruiters directly without spamming job boards. We help you showcase your technical authority, project write-ups, and technology viewpoints.',
      features: [
        'Complete profile overhaul (Headlines, About, Featured)',
        'Technical case study publishing blueprints',
        'Direct recruiter networking and outreach strategy',
        'Targeted endorsements and peer credibility network'
      ]
    },
    {
      icon: 'users',
      title: 'Rigorous 1-on-1 Mock Interviews',
      subtitle: 'Simulated Technical & Leadership Rounds',
      description: 'Practice real live coding, system design, and behavioral interviews under pressure with practicing engineers from top tech companies.',
      features: [
        'Live coding & data structures problem-solving drills',
        'Scalable system design & cloud architecture whiteboarding',
        'Behavioral STAR framework answering techniques',
        'Detailed scorecard and actionable feedback after every session'
      ]
    },
    {
      icon: 'briefcase',
      title: 'Placement Network & Hiring Partner Intros',
      subtitle: 'Direct Pathways into High-Growth Teams',
      description: 'Gain direct access to our hiring network of tech startups, consulting firms, and enterprise product companies looking for ready-to-deploy talent.',
      features: [
        'Exclusive hiring drives and invite-only interview slots',
        'Direct introductions to talent acquisition leads',
        'Offer evaluation and salary negotiation guidance',
        'Post-placement onboarding mentorship for your first 90 days'
      ]
    }
  ];

  steps: Step[] = [
    {
      step: '01',
      title: 'Core Technology Mastery',
      duration: 'Weeks 1 – 6',
      desc: 'Master fundamentals, modern architectural patterns, frameworks, and developer toolchains.'
    },
    {
      step: '02',
      title: 'Real-World Production Projects',
      duration: 'Weeks 7 – 12',
      desc: 'Build full-stack, cloud-deployed, and AI-enabled platforms in real collaborative agile teams.'
    },
    {
      step: '03',
      title: 'Portfolio & ATS Resume Polish',
      duration: 'Weeks 13 – 14',
      desc: 'Craft your industry-grade resume, curate your GitHub, and optimize your LinkedIn presence.'
    },
    {
      step: '04',
      title: 'Simulated Mock Interview Sprints',
      duration: 'Weeks 15 – 16',
      desc: '1-on-1 coding rounds, architecture defenses, and behavioral coaching with senior mentors.'
    },
    {
      step: '05',
      title: 'Hiring Drives & Placement',
      duration: 'Ongoing Support',
      desc: 'Interview pipelines, direct company referrals, salary negotiation, and day-one readiness.'
    }
  ];

  activePillarIndex = 0;

  setActivePillar(index: number): void {
    this.activePillarIndex = index;
  }
}
