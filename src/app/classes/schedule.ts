import { DayWorkout, DayWorkoutType } from '../classes/dayWorkout';

export type ScheduleType = {
  index_nr: number;
  weekNumber: number;
  userName: string;
  listOfDayWorkouts: DayWorkoutType[];
};
export class Schedule {
  private index_nr: number;
  private weekNumber: number;
  private userName: string;
  private listOfDayWorkouts: DayWorkoutType[];

  constructor(
    index_nr: number,
    weekNumber: number,
    userName: string,
    listOfDayWorkouts: DayWorkoutType[]
  ) {
    this.index_nr = index_nr;
    this.weekNumber = weekNumber;
    this.userName = userName;
    this.listOfDayWorkouts = listOfDayWorkouts;
  }

  get Index_nr(): number {
    return this.index_nr;
  }

  get WeekNumber(): number {
    return this.weekNumber;
  }

  set WeekNumber(weekNumber: number) {
    this.weekNumber = weekNumber;
  }

  get UserName(): string {
    return this.userName;
  }

  set UserName(userName: string) {
    this.userName = userName;
  }

  get ListOfDayWorkouts(): DayWorkoutType[] {
    return this.listOfDayWorkouts;
  }

  set ListOfDayWorkouts(listOfDayWorkouts: DayWorkoutType[]) {
    this.listOfDayWorkouts = listOfDayWorkouts;
  }
}
