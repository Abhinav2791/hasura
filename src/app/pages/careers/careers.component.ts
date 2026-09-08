import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Career } from '../../core/models/career.model';
import { ScrollService } from '../../core/services/scroll.service';

interface Perk {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-careers-page',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersPageComponent implements OnInit, AfterViewInit {
  allCareers: Career[] = [];
  filteredCareers: Career[] = [];
  activeDepartment = 'All';

  departments = ['All', 'Engineering', 'AI & Data', 'Cloud & DevOps', 'Design', 'Mentorship'];

  selectedCareer: Career | null = null;
  isModalOpen = false;

  perks: Perk[] = [
    {
      icon: 'zap',
      title: 'Real Impact from Day 1',
      desc: 'Build products and mentor engineers shaping real technology ecosystems with zero corporate red tape.'
    },
    {
      icon: 'award',
      title: 'Continuous Learning Budget',
      desc: 'Annual stipend for cloud certifications, tech conferences, engineering books, and specialized courses.'
    },
    {
      icon: 'clock',
      title: 'Flexible & Hybrid Work',
      desc: 'Work from where you are most productive with focus-friendly culture and asynchronous collaboration.'
    },
    {
      icon: 'heart',
      title: 'Comprehensive Health & Wellness',
      desc: 'Premium health insurance coverage for you and your family plus mental wellness days.'
    }
  ];

  constructor(private dataService: DataService, private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.dataService.getCareers().subscribe(data => {
      this.allCareers = data;
      this.filteredCareers = data;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.scrollService.initScrollAnimations(), 100);
  }

  setDepartment(dept: string): void {
    this.activeDepartment = dept;
    if (dept === 'All') {
      this.filteredCareers = this.allCareers;
    } else {
      this.filteredCareers = this.allCareers.filter(c => c.department === dept);
    }
  }

  openApplyModal(career: Career): void {
    this.selectedCareer = career;
    this.isModalOpen = true;
  }

  closeApplyModal(): void {
    this.isModalOpen = false;
    this.selectedCareer = null;
  }
}
