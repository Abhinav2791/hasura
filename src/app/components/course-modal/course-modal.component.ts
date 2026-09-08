import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Course } from '../../core/models/course.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';

interface Phase {
  phase: string;
  title: string;
  duration: string;
  topics: string[];
}

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnChanges, OnDestroy {
  @Input() course: Course | null = null;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  activeTab: 'curriculum' | 'tools' | 'career' | 'apply' = 'curriculum';
  openPhaseIndex: number | null = 0; // First phase expanded by default

  enrollForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;

  // Course-specific tailored curriculums
  courseCurriculums: { [key: string]: Phase[] } = {
    'java-fullstack': [
      {
        phase: 'Phase 01',
        title: 'Core Java & Object-Oriented System Architecture',
        duration: 'Weeks 1 – 5',
        topics: [
          'Java 17/21 language features: Records, Sealed Classes, Pattern Matching',
          'Object-Oriented Design Principles (SOLID) and Gang of Four Design Patterns',
          'Collections Framework, Stream API, Generics, and Lambda Expressions',
          'Multithreading, Concurrency Utilities, and JVM Memory Architecture',
          'Database Design, PostgreSQL/MySQL Schema Modeling, and JDBC / Connection Pooling'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Enterprise Backend with Spring Boot & Hibernate',
        duration: 'Weeks 6 – 10',
        topics: [
          'Spring Boot 3 Core: Dependency Injection, Inversion of Control & Profiles',
          'RESTful API Development with validation, global exception handling, and DTOs',
          'Spring Data JPA, Hibernate ORM, Entity Relationships, and Query Optimization',
          'Spring Security 6 with stateless JWT authentication and OAuth2 login',
          'Unit and Integration Testing with JUnit 5, Mockito, and Testcontainers'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Modern Reactive Frontend with Angular & TypeScript',
        duration: 'Weeks 11 – 15',
        topics: [
          'TypeScript essentials: Interfaces, Generics, Decorators, and Strict Typing',
          'Angular Architecture: Standalone Components, Directives, Pipes, and Reactive Forms',
          'Asynchronous state management with RxJS Observables, Operators, and Subject streams',
          'HTTP Interceptors, Route Guards, Lazy Loading, and Performance Optimization',
          'Enterprise UI Styling: Responsive SCSS, Component Design Systems, and Dark Mode'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Microservices, Docker Containers & Cloud Deployment',
        duration: 'Weeks 16 – 20',
        topics: [
          'Microservices Architecture: API Gateway, Service Registry (Eureka), and Config Server',
          'Event-driven messaging and asynchronous integration with Apache Kafka',
          'Multi-stage Docker containerization for Spring Boot and Angular services',
          'AWS Cloud Deployment: EC2, RDS PostgreSQL, S3 Asset Storage, and Docker Compose',
          'Capstone Project Defense: Real-world, production-ready enterprise full-stack platform'
        ]
      }
    ],
    'genai': [
      {
        phase: 'Phase 01',
        title: 'Python Foundations, Transformers & LLM Architecture',
        duration: 'Weeks 1 – 4',
        topics: [
          'Advanced Python for AI: AsyncIO, Typing, Pydantic, and modern Python tooling',
          'Attention mechanisms, Transformer architectures, and tokenization fundamentals',
          'Prompt Engineering mastery: Few-shot, Chain-of-Thought, and structured outputs',
          'OpenAI, Anthropic Claude, and Hugging Face API integration architectures'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'RAG Systems, Vector Databases & Semantic Search',
        duration: 'Weeks 5 – 8',
        topics: [
          'Retrieval-Augmented Generation (RAG) architecture and document chunking strategies',
          'Text embeddings, semantic similarity, and dense retrieval systems',
          'Vector database indexing and querying: Pinecone, ChromaDB, and Milvus',
          'Building advanced hybrid search pipelines with LangChain and LlamaIndex'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Autonomous Agents & Multi-Tool Orchestration',
        duration: 'Weeks 9 – 12',
        topics: [
          'ReAct framework and autonomous reasoning loops for AI agents',
          'Function calling, custom tool binding, and dynamic API execution',
          'LangGraph workflows for stateful, multi-agent collaborative systems',
          'Evaluation metrics: Faithfulness, hallucination detection, and Ragas benchmarking'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Production Deployment, Fine-Tuning & Cloud Scale',
        duration: 'Weeks 13 – 16',
        topics: [
          'Parameter-Efficient Fine-Tuning (PEFT/LoRA) using open-source models (Llama 3/Mistral)',
          'High-throughput asynchronous API serving with FastAPI and vLLM',
          'Caching layer implementation with Redis for low-latency LLM responses',
          'Capstone: Full enterprise Generative AI platform deployed live on AWS'
        ]
      }
    ],
    'aws-cloud': [
      {
        phase: 'Phase 01',
        title: 'Cloud Foundations, IAM & Core Networking Architecture',
        duration: 'Weeks 1 – 3',
        topics: [
          'AWS Global Infrastructure: Regions, Availability Zones, and Edge Locations',
          'Identity and Access Management (IAM): Roles, Policies, MFA, and Least Privilege',
          'Virtual Private Cloud (VPC): Subnets, Route Tables, NAT Gateways, and Security Groups',
          'Hybrid cloud connectivity: VPNs, Direct Connect, and VPC Peering'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Scalable Compute, Storage & Database Infrastructure',
        duration: 'Weeks 4 – 7',
        topics: [
          'Amazon EC2: Instance Types, AMIs, Auto Scaling Groups, and Elastic Load Balancing (ALB)',
          'Storage Solutions: Amazon S3 lifecycle rules, EFS distributed storage, and EBS volumes',
          'Relational Databases: AWS RDS Multi-AZ deployments, Read Replicas, and Aurora engine',
          'NoSQL Databases: Amazon DynamoDB global tables, DAX caching, and partitioning'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Serverless Architecture & Event-Driven Systems',
        duration: 'Weeks 8 – 11',
        topics: [
          'Serverless computing with AWS Lambda, layers, and event source mappings',
          'Amazon API Gateway: REST/WebSocket endpoints, throttling, and custom authorizers',
          'Asynchronous decoupling with Amazon SQS queues, SNS notifications, and EventBridge',
          'Containerized workloads with Amazon ECS (Fargate) and Elastic Container Registry (ECR)'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Infrastructure as Code (IaC), Monitoring & Security',
        duration: 'Weeks 12 – 14',
        topics: [
          'Terraform & AWS CloudFormation: Modular, reusable infrastructure provisioning',
          'CloudWatch monitoring, metric alarms, synthetic canaries, and AWS X-Ray tracing',
          'Security & Compliance: AWS WAF, Shield, KMS encryption, and AWS Secrets Manager',
          'Capstone: High-availability, fault-tolerant multi-tier enterprise cloud deployment'
        ]
      }
    ],
    'devops': [
      {
        phase: 'Phase 01',
        title: 'Linux Systems, Shell Automation & Version Control',
        duration: 'Weeks 1 – 4',
        topics: [
          'Advanced Linux systems administration, networking, process management, and systemd',
          'Bash shell automation scripting for operational workflows and cron jobs',
          'Git collaborative engineering: trunk-based development, rebasing, and branching policies',
          'Security hardening, SSH key management, and package repository maintenance'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Docker Containerization & Artifact Management',
        duration: 'Weeks 5 – 8',
        topics: [
          'Docker architecture: daemon, images, containers, networks, and storage volumes',
          'Writing optimized, multi-stage Dockerfiles for minimal production image footprints',
          'Multi-container local orchestration using Docker Compose and environment isolation',
          'Container vulnerability scanning with Trivy and automated image signing'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Kubernetes Cluster Orchestration & Helm Packaging',
        duration: 'Weeks 9 – 12',
        topics: [
          'Kubernetes architecture: control plane, kubelet, kube-proxy, etcd, and worker nodes',
          'Core workloads: Pods, Deployments, ReplicaSets, StatefulSets, and DaemonSets',
          'Networking: ClusterIP, NodePort, LoadBalancer, and Ingress controllers with SSL',
          'Configuration management with ConfigMaps, Secrets, and Helm 3 chart packaging'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'CI/CD Pipelines, Infrastructure as Code & Observability',
        duration: 'Weeks 13 – 16',
        topics: [
          'Automated CI/CD pipelines with GitHub Actions and GitLab CI/CD',
          'Infrastructure as Code (IaC) with Terraform: modules, state locking, and plan approvals',
          'GitOps continuous deployment using ArgoCD into live Kubernetes clusters',
          'Monitoring and observability stack: Prometheus metrics, Grafana dashboards, and Loki logs'
        ]
      }
    ],
    'ui-ux-design': [
      {
        phase: 'Phase 01',
        title: 'User Research, Information Architecture & UX Strategy',
        duration: 'Weeks 1 – 3',
        topics: [
          'User-centered design methodology and qualitative user interview frameworks',
          'User personas, empathy mapping, and customer journey mapping (CJM)',
          'Information architecture, card sorting, and navigation tree structures',
          'Competitive product audits and heuristic evaluation against Nielsen Norman principles'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Wireframing, Interaction Design & Figma Mastery',
        duration: 'Weeks 4 – 6',
        topics: [
          'Low-fidelity wireframing and paper prototyping for rapid conceptual validation',
          'Advanced Figma workflows: vector networks, shortcuts, and canvas organization',
          'Responsive layout grids, breakpoints, and content hierarchy rules',
          'Interactive micro-interactions, smart animate transitions, and component variants'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Design Systems & Atomic Component Architecture',
        duration: 'Weeks 7 – 9',
        topics: [
          'Design Tokens: Typography scales, color palettes, spacing units, and elevation levels',
          'Building scalable component libraries with Figma Auto Layout 5.0 and component properties',
          'Accessibility (WCAG 2.1 AA/AAA) contrast testing, focus states, and screen reader design',
          'Managing light and dark mode theming through semantic Figma variables'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Usability Testing, Developer Handoff & Portfolio',
        duration: 'Weeks 10 – 12',
        topics: [
          'Usability testing protocols, task completion analysis, and SUS score calculations',
          'Developer handoff documentation: redlining, CSS inspect specs, and asset exports',
          'Case study writing: communicating problem, research, iteration, and business outcomes',
          'Portfolio presentation and live design critique defense with industry product leads'
        ]
      }
    ]
  };

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.enrollForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{10,15}$/)]],
      experience: ['Student / Fresh Graduate', Validators.required],
      message: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.isSuccess = false;
      this.activeTab = 'curriculum';
      this.openPhaseIndex = 0; // Default first phase open
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    } else if (changes['isOpen'] && !this.isOpen) {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  getCurriculum(): Phase[] {
    if (this.course && this.courseCurriculums[this.course.id]) {
      return this.courseCurriculums[this.course.id];
    }
    // Fallback to java fullstack if not matched
    return this.courseCurriculums['java-fullstack'];
  }

  togglePhase(index: number): void {
    this.openPhaseIndex = this.openPhaseIndex === index ? null : index;
  }

  onClose(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    this.close.emit();
    this.isSuccess = false;
  }

  onSubmit(): void {
    if (this.enrollForm.invalid) {
      this.enrollForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;
      this.isSuccess = true;
      this.toastService.success(
        'Application Submitted!',
        `Your application for ${this.course?.title} has been received. Our counselor will contact you within 24 hours.`
      );
      this.enrollForm.reset({ experience: 'Student / Fresh Graduate' });
    }, 1000);
  }
}
