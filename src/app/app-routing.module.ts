import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'HASURA | Dream • Build • Grow' },
  { path: 'about', component: AboutComponent, title: 'About | HASURA' },
  { path: 'services', component: ServicesPageComponent, title: 'Services | HASURA' },
  { path: 'solutions', component: SolutionsPageComponent, title: 'Enterprise Solutions | HASURA' },
  { path: 'training', component: TrainingPageComponent, title: 'Training | HASURA' },
  { path: 'courses', component: CoursesPageComponent, title: 'Courses | HASURA' },
  { path: 'courses/:slug', component: CourseDetailComponent, title: 'Course Details | HASURA' },
  { path: 'course/:slug', redirectTo: 'courses/:slug', pathMatch: 'full' },
  { path: 'projects', component: ProjectsPageComponent, title: 'Projects | HASURA' },
  { path: 'careers', component: CareersPageComponent, title: 'Careers | HASURA' },
  { path: 'contact', component: ContactPageComponent, title: 'Contact | HASURA' },
  { path: 'login', component: LoginComponent, title: 'Log In | HASURA' },
  { path: 'signup', component: SignupComponent, title: 'Create Account | HASURA' },
  { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Reset Password | HASURA' },
  { path: 'forgot', redirectTo: 'forgot-password', pathMatch: 'full' },
  { path: 'student/dashboard', component: StudentDashboardComponent, canActivate: [AuthGuard], title: 'Student Dashboard | HASURA' },
  { path: 'dashboard', redirectTo: 'student/dashboard', pathMatch: 'full' },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard], title: 'Admin Console | HASURA' },
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
