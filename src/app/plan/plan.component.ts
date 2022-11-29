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
  currentDate!:Date

  constructor(usersService: UsersService) {
    this.usersService = usersService;
    this.currentDate = new Date();
    usersService
      .getScheduleFromWeekNumber(48)
      .subscribe((data) => {(this.schedule = data)
      console.log(data)});
    usersService.getWorkouts().subscribe((data) => (this.workouts = data));
    this.week = this.getWeek(this.currentDate);console.log(this.week)
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
          currentDate.toLocaleDateString('en-us'),
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
    let workoutType!:WorkoutType
    this.workouts.forEach(element => {
      if(element.Name==data.target.value){
         workoutType = {
          index_nr:element.Index_nr,
          name:element.Name,
          description:element.Description
        }
      }
    });

    this.schedule.ListOfDayWorkouts.find(u=>u.date==this.currentDay.Date)?.workouts.push(workoutType)
    console.log("ten work",workoutType)
    console.log("ten czas",data.target.ngValue)
    console.log("ten np",this.schedule)
    this.usersService.addWorkoutToSchedule(this.schedule)
    this.isEdit=false
  }

  public workoutDelete(workoutType:WorkoutType){
    let position:number=Number(this.schedule.ListOfDayWorkouts.find(u=>u.date==this.currentDay.Date)?.workouts.indexOf(workoutType))
    console.log("pozycja",position)
    this.schedule.ListOfDayWorkouts.find(u=>u.date==this.currentDay.Date)?.workouts.splice(position,1)
    console.log(this.schedule.ListOfDayWorkouts.find(u=>u.date==this.currentDay.Date)?.workouts)
    //delete this.schedule.ListOfDayWorkouts.find(u=>u.date==this.currentDay.Date)?.workouts[position]
    this.usersService.addWorkoutToSchedule(this.schedule)
    this.isEdit=false
  }

  public nextWeek(){
    this.usersService
    .getScheduleFromWeekNumber(Number(this.schedule.WeekNumber)+1)
    .subscribe((data) => {(this.schedule = data)
    console.log(data)
    let date:Date = new Date(Date.parse(this.schedule.ListOfDayWorkouts[0].date))
    this.week=this.getWeek(date)
    this.previousMonday = this.getPreviousMonday(this.week);
    this.nextMonday = this.getNextMonday(this.week);});

  }

  public previousWeek(){
    this.usersService
    .getScheduleFromWeekNumber(Number(this.schedule.WeekNumber)-1)
    .subscribe((data) => {(this.schedule = data)
    console.log(data)
    let date:Date = new Date(Date.parse(this.schedule.ListOfDayWorkouts[0].date))
    this.week=this.getWeek(date) ;console.log(this.week)
    this.previousMonday = this.getPreviousMonday(this.week);
    this.nextMonday = this.getNextMonday(this.week);});

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
