import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesPageComponent } from './pages/services/services.component';
import { TrainingPageComponent } from './pages/training/training.component';
import { CoursesPageComponent } from './pages/courses/courses.component';
import { ProjectsPageComponent } from './pages/projects/projects.component';
import { CareersPageComponent } from './pages/careers/careers.component';
import { ContactPageComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'HASURA | Dream • Build • Grow' },
  { path: 'about', component: AboutComponent, title: 'About | HASURA' },
  { path: 'services', component: ServicesPageComponent, title: 'Services | HASURA' },
  { path: 'training', component: TrainingPageComponent, title: 'Training | HASURA' },
  { path: 'courses', component: CoursesPageComponent, title: 'Courses | HASURA' },
  { path: 'projects', component: ProjectsPageComponent, title: 'Projects | HASURA' },
  { path: 'careers', component: CareersPageComponent, title: 'Careers | HASURA' },
  { path: 'contact', component: ContactPageComponent, title: 'Contact | HASURA' },
  { path: 'login', component: LoginComponent, title: 'Log In | HASURA' },
  { path: 'signup', component: SignupComponent, title: 'Create Account | HASURA' },
  { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Reset Password | HASURA' },
  { path: 'forgot', redirectTo: 'forgot-password', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
