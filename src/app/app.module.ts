import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { PlanComponent } from './plan/plan.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { WorkoutComponent } from './workout/workout.component';

export const appRouters: Routes = [
  {path: 'login', component: LogInComponent},
  {path: 'registration', component: RegistrationComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    UserDeleteComponent,
    UserEditComponent,
    LogInComponent,
    RegistrationComponent,
    PlanComponent,
    WorkoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRouters)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
