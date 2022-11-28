import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import {LogInComponent} from './log-in/log-in.component'
import { PlanComponent } from './plan/plan.component';
import { RegistrationComponent } from './registration/registration.component'

const routes: Routes = [
    {path: 'log-in', component: LogInComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'plan', component: PlanComponent},
    {path: '', redirectTo: '/log-in', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
