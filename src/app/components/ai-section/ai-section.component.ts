import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-section',
  templateUrl: './ai-section.component.html',
  styleUrls: ['./ai-section.component.scss']
})
export class AiSectionComponent {
  capabilities = [
    { label: 'DATA', desc: 'Intelligent data pipelines', angle: -90 },
    { label: 'RAG', desc: 'Retrieval-augmented generation', angle: -30 },
    { label: 'APIs', desc: 'LLM and AI API integrations', angle: 30 },
    { label: 'APPS', desc: 'AI-powered applications', angle: 90 },
    { label: 'AUTO', desc: 'Intelligent automation', angle: 150 },
    { label: 'USERS', desc: 'Intelligent user experiences', angle: -150 },
  ];

  aiServices = [
    'Generative AI Applications',
    'LLM Integration & Fine-tuning',
    'RAG Systems & Vector Databases',
    'AI Automation & Workflows',
    'Intelligent Assistants',
    'AI-Powered Product Development',
  ];
}
