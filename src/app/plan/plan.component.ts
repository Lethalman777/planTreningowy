import { Component, EventEmitter } from '@angular/core';
import { Schedule } from '../classes/schedule';
import { UsersService } from '../users.service';
import { Workout, WorkoutType } from '../classes/workout';
import { Day } from '../classes/day';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent {
  usersService!: UsersService;
  schedule: Schedule = new Schedule(0, 0, '', []);
  workouts: Workout[] = [];
  workout!:Workout
  week: Day[] = [];
  previousMonday!: string;
  nextMonday!: string;
  isEdit:boolean = false
  currentDay!:Day

  constructor(usersService: UsersService) {
    this.usersService = usersService;
    const currentDate: Date = new Date();
    usersService
      .getScheduleFromWeekNumber(48)
      .subscribe((data) => {(this.schedule = data)
      console.log(data)});
    usersService.getWorkouts().subscribe((data) => (this.workouts = data));
    this.week = this.getWeek(currentDate);
    this.previousMonday = this.getPreviousMonday(this.week);
    this.nextMonday = this.getNextMonday(this.week);
  }

  ngOnInit(): void {
  }

  private getWeek(currentDate: Date): Day[] {
    let currentDay: number = currentDate.getDate();
    while (
      currentDate.toLocaleDateString('pl-pl', { weekday: 'long' }) !=
      'poniedziałek'
    ) {
      currentDay--;
      currentDate.setDate(currentDay);
    }

    let week: Day[] = [];
    for (let index = 1; index <= 7; index++) {
      week.push(
        new Day(
          currentDate.toLocaleDateString(),
          currentDate.toLocaleDateString('pl-pl', { weekday: 'long' })
        )
      );
      if (currentDay > 30) {
        currentDay = 1;
      }
      currentDay++;
      currentDate.setDate(currentDay);
    }

    return week;
  }

  public doEdit(day:Day){
    if(this.isEdit){
      this.isEdit=false
    }else{
      this.isEdit=true
      this.currentDay=day
    }
  }

  public workoutChoose(data:any){
    const workoutType : WorkoutType = {
      index_nr:data.target.value.Index_nr,
      name:data.target.value.Name,
      description:data.target.value.Description
    }
    this.schedule.ListOfDayWorkouts.find(u=>u.date==this.currentDay.Date)?.workouts.push(workoutType)
    this.usersService.addWorkoutToSchedule(this.schedule)
    this.isEdit=false
  }

  public nextWeek(){
    this.usersService
    .getScheduleFromWeekNumber(Number(this.schedule.WeekNumber)+1)
    .subscribe((data) => {(this.schedule = data)
    console.log(data)});
  }

  public previousWeek(){
    this.usersService
    .getScheduleFromWeekNumber(Number(this.schedule.WeekNumber)-1)
    .subscribe((data) => {(this.schedule = data)
    console.log(data)});
  }

  private getPreviousMonday(week: Day[]): string {
    let dates: string[] = week[0].Date.split('.');
    const pastDate = new Date(dates[1] + '/' + dates[0] + '/' + dates[2]);
    pastDate.setDate(pastDate.getDate() - 7);

    return pastDate.toLocaleDateString();
  }

  private getNextMonday(week: Day[]): string {
    let dates: string[] = week[6].Date.split('.');
    const nextDate = new Date(dates[1] + '/' + dates[0] + '/' + dates[2]);
    nextDate.setDate(nextDate.getDate() + 1);

    return nextDate.toLocaleDateString();
  }

}
