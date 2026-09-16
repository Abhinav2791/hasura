import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared Components
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { SearchModalComponent } from './shared/components/search-modal/search-modal.component';

// Section Components
import { HeroComponent } from './components/hero/hero.component';
import { TrustStripComponent } from './components/trust-strip/trust-strip.component';
import { WhatHasuraDoesComponent } from './components/what-hasura-does/what-hasura-does.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { AiSectionComponent } from './components/ai-section/ai-section.component';
import { TrainingSectionComponent } from './components/training-section/training-section.component';
import { LearnBuildGrowComponent } from './components/learn-build-grow/learn-build-grow.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { CareerSupportComponent } from './components/career-support/career-support.component';
import { TechEcosystemComponent } from './components/tech-ecosystem/tech-ecosystem.component';
import { WhyHasuraComponent } from './components/why-hasura/why-hasura.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';
import { FinalCtaComponent } from './components/final-cta/final-cta.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';

// Interactive Modals
import { CourseModalComponent } from './components/course-modal/course-modal.component';
import { CaseStudyModalComponent } from './components/case-study-modal/case-study-modal.component';
import { ApplyModalComponent } from './components/apply-modal/apply-modal.component';

// Page Components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesPageComponent } from './pages/services/services.component';
import { SolutionsPageComponent } from './pages/solutions/solutions.component';
import { TrainingPageComponent } from './pages/training/training.component';
import { CoursesPageComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { ProjectsPageComponent } from './pages/projects/projects.component';
import { CareersPageComponent } from './pages/careers/careers.component';
import { ContactPageComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

// Services & Guards
import { DataService } from './core/services/data.service';
import { ScrollService } from './core/services/scroll.service';
import { ToastService } from './core/services/toast.service';
import { AuthService } from './core/services/auth.service';
import { CourseService } from './core/services/course.service';
import { EnrollmentService } from './core/services/enrollment.service';
import { ContactService } from './core/services/contact.service';
import { ProfileService } from './core/services/profile.service';
import { AdminService } from './core/services/admin.service';
import { StorageService } from './core/services/storage.service';
import { SupabaseService } from './core/services/supabase.service';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    // Shared
    NavbarComponent,
    FooterComponent,
    ToastComponent,
    SearchModalComponent,
    // Sections
    HeroComponent,
    TrustStripComponent,
    WhatHasuraDoesComponent,
    ServicesSectionComponent,
    AiSectionComponent,
    TrainingSectionComponent,
    LearnBuildGrowComponent,
    ProjectsSectionComponent,
    CareerSupportComponent,
    TechEcosystemComponent,
    WhyHasuraComponent,
    TestimonialsComponent,
    FaqSectionComponent,
    FinalCtaComponent,
    ContactSectionComponent,
    // Modals
    CourseModalComponent,
    CaseStudyModalComponent,
    ApplyModalComponent,
    // Pages
    HomeComponent,
    AboutComponent,
    ServicesPageComponent,
    SolutionsPageComponent,
    TrainingPageComponent,
    CoursesPageComponent,
    CourseDetailComponent,
    ProjectsPageComponent,
    CareersPageComponent,
    ContactPageComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    StudentDashboardComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    DataService,
    ScrollService,
    ToastService,
    AuthService,
    CourseService,
    EnrollmentService,
    ContactService,
    ProfileService,
    AdminService,
    StorageService,
    SupabaseService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
