import { Component, Input, OnInit } from '@angular/core';
import { User, UserType } from '../classes/user';
import { Workout } from '../classes/workout';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent {
  @Input() index_nr!:Number
  @Input() workout!:Workout
  workouts:Workout[]=[]
  usersService: UsersService
  constructor(usersService: UsersService){
    this.usersService = usersService
    usersService.getWorkouts().subscribe(data=>this.workouts=data)
    // this.workouts.forEach(element => {
    //   if(element.Index_nr == this.index_nr){
    //     this.workout = element
    //   }
    // });
  }
}
