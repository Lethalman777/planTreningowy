import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { User, UserType } from '../classes/user';
import { Schedule, ScheduleType } from '../classes/schedule';
import { UsersService } from '../users.service';
import { Workout } from '../classes/workout';
import { WorkoutComponent } from '../workout/workout.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  usersService!:UsersService
  schedules:Schedule[]=[]
  workouts:Workout[]=[]
  week:String[]=[]
  constructor(usersService:UsersService){
    this.usersService=usersService
    usersService.getSchedule().subscribe(data=>this.schedules=data)
    usersService.getWorkouts().subscribe(data=>this.workouts=data)
    this.week.push("Poniedziałek")
    this.week.push("Wtorek")
    this.week.push("Środa")
    this.week.push("Czwartek")
    this.week.push("Piątek")
    this.week.push("Sobota")
    this.week.push("Niedziela")
  }
}
