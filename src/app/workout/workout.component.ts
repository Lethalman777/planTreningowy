import { Component, Input } from '@angular/core';
import { Workout } from '../classes/workout';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent {
  @Input() workout!: Workout;
  constructor() {}
}
