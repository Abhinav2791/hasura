import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit {
  @Input() showAll = false;

  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  activeFilter = 'All';

  filters = ['All', 'Retail Technology', 'Human Resources Technology', 'Financial Technology', 'Healthcare Technology'];

  selectedProject: Project | null = null;
  isModalOpen = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getProjects().subscribe(data => {
      this.allProjects = data;
      this.applyFilter();
    });
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  private applyFilter(): void {
    let list = this.showAll ? this.allProjects : this.allProjects.filter(p => p.featured);
    if (this.activeFilter !== 'All') {
      list = this.allProjects.filter(p => p.industry === this.activeFilter);
    }
    this.filteredProjects = list;
  }

  openCaseStudy(project: Project): void {
    this.selectedProject = project;
    this.isModalOpen = true;
  }

  closeCaseStudy(): void {
    this.isModalOpen = false;
    this.selectedProject = null;
  }

  getProjectBg(industry: string): string {
    const map: { [key: string]: string } = {
      'Retail Technology': 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)',
      'Human Resources Technology': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      'Financial Technology': 'linear-gradient(135deg, #0c4a6e 0%, #0f172a 100%)',
      'Healthcare Technology': 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
    };
    return map[industry] || 'linear-gradient(135deg, #0f172a 0%, #1e2d5c 100%)';
  }
}
