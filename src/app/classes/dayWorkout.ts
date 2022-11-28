import { Workout } from "./workout";

export type DayWorkoutType = {
  date: string;
  workouts: Workout[];
};
export class DayWorkout {
  private date: string;
  private workouts: Workout[];

  constructor(
    date: string,
    workouts: Workout[]
  ) {
    this.date = date;
    this.workouts = workouts;
  }

  get Workouts(): Workout[] {
    return this.workouts;
  }

  set Workouts(workouts: Workout[]) {
    this.workouts = workouts;
  }

  get Date(): string {
    return this.date;
  }

  set Date(date: string) {
    this.date = date;
  }
}
