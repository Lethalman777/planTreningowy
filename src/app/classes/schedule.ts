export type ScheduleType = {
  index_nr : number
  index_workout : number
  day : string
}
export class Schedule{
  private index_nr : number
  private index_workout : number
  private day : string

  constructor(index_nr:number, index_workout:number, day:string){
    this.index_nr = index_nr
    this.index_workout = index_workout
    this.day = day
  }

  get Index_nr(): number {
    return this.index_nr;
  }
  get Index_workout(): number {
    return this.index_workout;
  }
  get Day(): string {
    return this.day;
  }
  set Index_nr(index_nr: number){
    this.index_nr = index_nr;
  }
  set Index_workout(index_workout: number){
    this.index_workout = index_workout;
  }
  set Day(day: string){
    this.Day = day;
  }
  }
