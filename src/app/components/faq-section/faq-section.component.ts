import { Component } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'training' | 'services' | 'careers';
}

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.scss']
})
export class FaqSectionComponent {
  categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'training', label: 'Training & Courses' },
    { id: 'services', label: 'Enterprise Services' },
    { id: 'careers', label: 'Career & Placements' }
  ];

  activeCategory = 'all';
  openIndex: number | null = 0; // First item opened by default

  faqs: FaqItem[] = [
    {
      question: 'How is Hasura different from typical coaching institutes or IT agencies?',
      answer: 'Hasura operates as a unified technology partner. We build production-grade software solutions for businesses, which means our training curriculum is taught directly by engineers building real products. There are no dummy projects, no outdated slide decks — you work with modern enterprise stacks, cloud architectures, and AI frameworks.',
      category: 'general'
    },
    {
      question: 'What is Hasura\'s "Project-First" methodology?',
      answer: 'Instead of spending weeks on isolated theory, every module is anchored to a real-world software product. You will design architectures, write clean code, handle git merge requests, write unit tests, and deploy to AWS or cloud environments. By graduation, you have an impressive GitHub portfolio of deployed applications.',
      category: 'training'
    },
    {
      question: 'What specific career and placement support does Hasura provide?',
      answer: 'Every learner receives end-to-end career guidance: ATS-optimized resume reviews, LinkedIn brand optimization, 1-on-1 technical mock interviews with senior engineers, system design interview prep, and direct interview referrals into our network of 50+ hiring partners and startups.',
      category: 'careers'
    },
    {
      question: 'Can Hasura develop end-to-end custom software for my business?',
      answer: 'Yes. Our enterprise engineering division builds custom web & mobile platforms, AI/GenAI integrations, cloud migrations (AWS), DevOps pipelines, and enterprise Java/Spring microservices. We offer flexible engagement models from fixed-scope delivery to dedicated engineering squads.',
      category: 'services'
    },
    {
      question: 'Are the training programs beginner-friendly or do I need prior coding experience?',
      answer: 'We have dedicated tracks for different experience levels. Tracks like Java Full Stack and AWS Cloud start with foundational principles before accelerating into advanced enterprise patterns. For advanced programs like Generative AI and DevOps, basic programming familiarity is recommended. Our team conducts a free profile assessment before enrollment.',
      category: 'training'
    },
    {
      question: 'How do client consultations and project scoping work?',
      answer: 'You can request a consultation via our contact form or book a call directly. Within 24 hours, an engineering lead will review your requirements, provide a free architectural feasibility assessment, and outline milestones, budget options, and delivery timelines.',
      category: 'services'
    },
    {
      question: 'Do you offer corporate training and team upskilling programs?',
      answer: 'Yes. We partner with tech enterprises to upskill engineering teams in Generative AI, Cloud Migration, Microservices, and DevOps automation. Programs can be delivered on-site or in live interactive virtual sprints tailored to your company\'s tech stack.',
      category: 'training'
    },
    {
      question: 'What certifications or credentials do I receive after completing a course?',
      answer: 'You receive an official Hasura Industry-Ready Engineer Credential verifiable online, plus comprehensive guidance for globally recognized certifications such as AWS Solutions Architect, Docker/Kubernetes CKA, and Spring Certified Professional.',
      category: 'training'
    }
  ];

  get filteredFaqs(): FaqItem[] {
    if (this.activeCategory === 'all') {
      return this.faqs;
    }
    return this.faqs.filter(f => f.category === this.activeCategory);
  }

  setCategory(category: string): void {
    this.activeCategory = category;
    this.openIndex = null;
  }

  toggle(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
