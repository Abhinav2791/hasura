import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';

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

interface HiringDomain {
  name: string;
  count: string;
  techs: string[];
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

  // Enriched hiring domains for Pillar 04 & Section Space
  hiringDomains: HiringDomain[] = [
    { name: 'AI Labs & Deep Tech', count: '12+ Partners', techs: ['LangChain', 'Python', 'Vector DBs'] },
    { name: 'Enterprise Cloud & SaaS', count: '18+ Partners', techs: ['AWS', 'Spring Boot', 'Kubernetes'] },
    { name: 'FinTech & Banking Solutions', count: '11+ Partners', techs: ['Microservices', 'Kafka', 'PostgreSQL'] },
    { name: 'Product Engineering Squads', count: '14+ Partners', techs: ['Angular', 'Next.js', 'DevOps'] }
  ];

  // Hiring partner logos/names
  hiringPartners = [
    'Tech Mahindra', 'Accenture', 'Thoughtworks', 'Freshworks',
    'Razorpay', 'Swiggy', 'CRED', 'Capgemini'
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
  activeRoadmapStep = 0;

  // Counseling Modal State
  isCounselingModalOpen = false;
  counselingForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.counselingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{10,15}$/)]],
      domainInterest: ['Full Stack Development', Validators.required],
      experienceLevel: ['Student / Fresher', Validators.required],
      notes: ['']
    });
  }

  setActivePillar(index: number): void {
    if (index >= 0 && index < this.pillars.length) {
      this.activePillarIndex = index;
    }
  }

  onPillarKeyDown(event: KeyboardEvent, currentIndex: number): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % this.pillars.length;
      this.setActivePillar(nextIndex);
      this.focusTab(nextIndex);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + this.pillars.length) % this.pillars.length;
      this.setActivePillar(prevIndex);
      this.focusTab(prevIndex);
    }
  }

  private focusTab(index: number): void {
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const tab = document.getElementById('pillar-tab-' + index);
        if (tab) tab.focus();
      }, 0);
    }
  }

  openCounselingModal(): void {
    this.isCounselingModalOpen = true;
    this.isSuccess = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeCounselingModal(): void {
    this.isCounselingModalOpen = false;
    this.isSuccess = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  submitCounseling(): void {
    if (this.counselingForm.invalid) {
      this.counselingForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSuccess = true;
      this.toastService.success(
        'Counseling Session Requested!',
        'A Hasura career advisor will connect with you via WhatsApp/Email within 24 hours.'
      );
      this.counselingForm.reset({
        domainInterest: 'Full Stack Development',
        experienceLevel: 'Student / Fresher'
      });
      setTimeout(() => {
        this.closeCounselingModal();
      }, 1800);
    }, 1000);
  }
}
