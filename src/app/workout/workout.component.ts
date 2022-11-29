import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Workout, WorkoutType } from '../classes/workout';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent {
  @Input() workout!: WorkoutType;
  @Input() index_nr!: number
  constructor() {

  }

}
