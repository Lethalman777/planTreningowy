import { Component, OnInit } from '@angular/core';
import { Schedule } from '../classes/schedule';
import { UsersService } from '../users.service';
import { Workout, WorkoutType } from '../classes/workout';
import { Day } from '../classes/day';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {
  index_nr!:number
  usersService!: UsersService;
  schedule: Schedule = new Schedule(0, 0, '', []);
  schedules!: Schedule[];
  workouts: Workout[] = [];
  workout!: Workout;
  week: Day[] = [];
  isEdit: boolean = false;
  currentDay!: Day;
  currentDate!: Date;

  constructor(usersService: UsersService,private router: Router, private route: ActivatedRoute) {
    this.usersService = usersService;
    this.currentDate = new Date();
    usersService.getScheduleFromWeekNumber(48).subscribe((data) => {
      this.schedule = data;
    });
    usersService.getWorkouts().subscribe((data) => (this.workouts = data));
    this.week = this.getWeek(this.currentDate);
    console.log(this.week);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //this.id = Number(params['id']);
      this.index_nr = Number(this.route.snapshot.paramMap.get('id'))})
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

  public doEdit(day: Day) {
    if (this.isEdit) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      this.currentDay = day;
    }
  }

  public workoutChoose(data: any) {
    let workoutType!: WorkoutType;
    this.workouts.forEach((element) => {
      if (element.Name == data.target.value) {
        workoutType = {
          index_nr: element.Index_nr,
          name: element.Name,
          description: element.Description,
        };
      }
    });

    this.schedule.ListOfDayWorkouts.find(
      (u) => u.date == this.currentDay.Date
    )?.workouts.push(workoutType);
    console.log('ten work', workoutType);
    console.log(
      'ten czas',
      this.schedule.ListOfDayWorkouts.find(
        (u) => u.date == this.currentDay.Date
      )?.workouts
    );
    console.log('ten np', this.schedule);
    this.usersService.addWorkoutToSchedule(this.schedule);
    this.isEdit = false;
  }

  public workoutDelete(workoutType: WorkoutType) {
    let position: number = Number(
      this.schedule.ListOfDayWorkouts.find(
        (u) => u.date == this.currentDay.Date
      )?.workouts.indexOf(workoutType)
    );
    this.schedule.ListOfDayWorkouts.find(
      (u) => u.date == this.currentDay.Date
    )?.workouts.splice(position, 1);
    this.usersService.addWorkoutToSchedule(this.schedule);
    this.isEdit = false;
  }

  public nextWeek() {
    // if (
    //   this.schedules.find(
    //     (u) => Number(u.WeekNumber) == Number(this.schedule.WeekNumber) + 1
    //   ) == null
    // ) {
    //   return;
    // }
    this.usersService
      .getScheduleFromWeekNumber(Number(this.schedule.WeekNumber) + 1)
      .subscribe((data) => {
        this.schedule = data;
        let date: Date = new Date(this.schedule.ListOfDayWorkouts[0].date);
        this.week = this.getWeek(date);
      });
  }

  public previousWeek() {
    // if (
    //   this.schedules.find(
    //     (u) => Number(u.WeekNumber) == Number(this.schedule.WeekNumber) - 1
    //   ) == null
    // ) {
    //   return;
    // }
    this.usersService
      .getScheduleFromWeekNumber(Number(this.schedule.WeekNumber) - 1)
      .subscribe((data) => {
        this.schedule = data;
        let date: Date = new Date(this.schedule.ListOfDayWorkouts[0].date);
        this.week = this.getWeek(date);
        console.log(this.week);
      });
  }

  public goToDetails(){
    this.router.navigate(['/users',this.index_nr])
  }
}
