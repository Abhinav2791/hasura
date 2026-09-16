import { Component, OnInit } from '@angular/core';

interface Solution {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  technologies: string[];
  icon: string;
}

@Component({
  selector: 'app-solutions-page',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsPageComponent implements OnInit {
  activePillarIndex = 0;

  solutions: Solution[] = [
    {
      id: 'ai-transform',
      badge: 'ARTIFICIAL INTELLIGENCE',
      title: 'Enterprise AI & Generative AI Systems',
      tagline: 'Embed intelligent cognitive agents directly into business workflows.',
      description: 'We architect and deploy secure, private RAG pipelines, custom LLM models, and autonomous AI microservices that automate enterprise workflows while maintaining strict data governance.',
      capabilities: [
        'Proprietary Enterprise Retrieval-Augmented Generation (RAG)',
        'Fine-tuned domain-specific LLM adapters & evaluation frameworks',
        'Multi-agent workflow orchestration & intelligent automation',
        'Vector database indexing and semantic search at enterprise scale'
      ],
      deliverables: [
        'Self-hosted or VPC-isolated LLM microservices',
        'Zero-data-leakage compliance auditing',
        'Interactive administrative oversight dashboards',
        'Comprehensive benchmark & latency report'
      ],
      technologies: ['OpenAI', 'LangChain', 'FastAPI', 'Pinecone', 'Hugging Face', 'Python'],
      icon: 'brain'
    },
    {
      id: 'cloud-scale',
      badge: 'CLOUD & INFRASTRUCTURE',
      title: 'Cloud Modernization & DevOps Automation',
      tagline: 'High-availability, zero-downtime infrastructure engineered for infinite scale.',
      description: 'Transform legacy monoliths into cloud-native distributed microservices on AWS and modern cloud platforms. We build resilient multi-region architectures with automated CI/CD and self-healing clusters.',
      capabilities: [
        'Cloud-native migration with zero customer downtime',
        'Kubernetes container orchestration & automated auto-scaling',
        'Infrastructure as Code (IaC) with Terraform & CloudFormation',
        'Automated Canary and Blue/Green deployment pipelines'
      ],
      deliverables: [
        'Production Terraform modules with automated state locking',
        'Prometheus & Grafana distributed observability stack',
        'SOC2 and ISO 27001 compliant infrastructure blueprints',
        'Disaster recovery failover tested and verified'
      ],
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus'],
      icon: 'cloud'
    },
    {
      id: 'product-engineering',
      badge: 'FULL-STACK ENGINEERING',
      title: 'Mission-Critical Software Engineering',
      tagline: 'Engineered for extreme performance, security, and human clarity.',
      description: 'From high-concurrency transactional backend systems to ultra-responsive web and mobile client interfaces. We engineer digital products designed to scale with your business growth.',
      capabilities: [
        'Clean modular Angular and React application architectures',
        'High-throughput Java Spring Boot and Node.js microservices',
        'Optimized PostgreSQL database schemas and query tuning',
        'End-to-end type safety and resilient automated test suites'
      ],
      deliverables: [
        'Complete repository with CI/CD and automated test coverage',
        'Interactive Storybook design token documentation',
        'Scalable REST & GraphQL API specifications',
        'Production deployment with staging verification environments'
      ],
      technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Redis'],
      icon: 'layers'
    },
    {
      id: 'talent-acceleration',
      badge: 'TALENT ACCELERATION',
      title: 'Corporate Talent Upskilling & Incubation',
      tagline: 'Transform engineering teams into high-performing innovators.',
      description: 'Hasura equips enterprise teams and ambitious software professionals with cutting-edge real-world competencies across Generative AI, Cloud, and Full Stack software delivery.',
      capabilities: [
        'Role-specific custom curriculum aligned with corporate tech stacks',
        'Hands-on sandbox labs with real production codebases',
        'Technical mentorship from senior staff engineers and architects',
        'Skill benchmark assessments and competency verification'
      ],
      deliverables: [
        'Customized corporate syllabus & digital learning portal',
        'Weekly sprint reviews and code review sessions',
        'Verified certificates of competency with unique IDs',
        'Measurable talent growth & team velocity metrics'
      ],
      technologies: ['AI Engineering', 'AWS Cloud', 'DevOps', 'Full Stack', 'UI/UX'],
      icon: 'users'
    }
  ];

  ngOnInit(): void {}

  selectPillar(index: number): void {
    this.activePillarIndex = index;
  }
}
