import { Workout, WorkoutType } from "./workout";

export type DayWorkoutType = {
  date: string;
  workouts: WorkoutType[];
};
export class DayWorkout {
  private date: string;
  private workouts: WorkoutType[];

  constructor(
    date: string,
    workouts: WorkoutType[]
  ) {
    this.date = date;
    this.workouts = workouts;
  }

  get Workouts(): WorkoutType[] {
    return this.workouts;
  }

  set Workouts(workouts: WorkoutType[]) {
    this.workouts = workouts;
  }

  get Date(): string {
    return this.date;
  }

  set Date(date: string) {
    this.date = date;
  }
}
