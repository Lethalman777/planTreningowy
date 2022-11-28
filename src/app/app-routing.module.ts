import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import {LogInComponent} from './log-in/log-in.component'
import { PlanComponent } from './plan/plan.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationComponent } from './registration/registration.component'
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {path: 'log-in', component: LogInComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'plan', component: PlanComponent},
    {path: '', redirectTo:'/home', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path:'users/:id', component: UserDetailComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
