import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, UserType } from './classes/user';
import { Workout, WorkoutType } from './classes/workout';
import { catchError, map } from 'rxjs/operators';
import { LoginAccount, LoginAccountType } from './classes/loginAccount';
import { Schedule, ScheduleType } from './classes/schedule';
import { RegistrationAccount, RegistrationAccountType } from './classes/registrationAccount';
import { UsersComponent } from './users/users.component';
import { DayWorkout, DayWorkoutType } from './classes/dayWorkout';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'http://localhost:7777/users';
  private accountsUrl = 'http://localhost:7777/accounts';
  private workoutsUrl = 'http://localhost:7777/workouts';
  private scheduleUrl = 'http://localhost:7777/schedule';

  constructor(private http: HttpClient) {}

  deleteUser(index_nr:number) {
    this.http
      .delete<User>(this.url + '/' + index_nr)
      .pipe(catchError(this.handleError<User>('deleteUser')))
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteAccount(index_nr:number) {
    this.http
      .delete<LoginAccount>(this.accountsUrl + '/' + index_nr)
      .pipe(catchError(this.handleError<LoginAccount>('deleteAccount')))
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteSchedule(index_nr:number) {
    this.http
      .delete<Schedule>(this.scheduleUrl + '/' + index_nr)
      .pipe(catchError(this.handleError<Schedule>('deleteSchedule')))
      .subscribe((res) => {
        console.log(res);
      });
  }

   getUser(index_nr:number): Observable<User> {
     console.log("get user "+index_nr);
     return this.http.get<UserType>(this.url+'/'+index_nr)
     .pipe(map((Usser:{index_nr:number,
       name:string,
       age:number,
       weight:number,
       height:number,
       gender:string})=>
         new User(Usser.index_nr,Usser.name,Usser.age,Usser.weight,Usser.height,Usser.gender)
       ),
        catchError(this.handleError<User>('getUser')))
   }
  // getUser(id: number):Observable<User>{

  //   return of(user);
  // }

  getWorkouts(): Observable<Workout[]> {
    console.log('get workout');
    return this.http.get<WorkoutType[]>(this.workoutsUrl).pipe(
      map(
        (
          Workouts: {
            index_nr: number;
            name: string;
            description: string;
          }[]
        ) =>
          Workouts.map((workout) => {
            return new Workout(
              workout.index_nr,
              workout.name,
              workout.description
            );
          })
      ),
      catchError(this.handleError<Workout[]>('getWorkouts', []))
    );
  }

  getSchedule(): Observable<Schedule[]> {
    console.log('get workout');
    return this.http.get<ScheduleType[]>(this.scheduleUrl).pipe(
      map(
        (
          Schedules: {
            index_nr: number;
            userName: string;
            weekNumber: number;
            listOfDayWorkouts: DayWorkoutType[];
          }[]
        ) =>
          Schedules.map((schedule) => {
            return new Schedule(
              schedule.index_nr,
              schedule.weekNumber,
              schedule.userName,
              schedule.listOfDayWorkouts
            );
          })
      ),
      catchError(this.handleError<Schedule[]>('getSchedules', []))
    );
  }

  getScheduleFromWeekNumber(weekNumber: number): Observable<Schedule> {
    return this.http
      .get<ScheduleType>(this.scheduleUrl + '/' + weekNumber)
      .pipe(
        map(
          (schedule: {
            index_nr: number;
            weekNumber: number;
            userName: string;
            listOfDayWorkouts: DayWorkoutType[];
          }) => {
            return new Schedule(
              schedule.index_nr,
              schedule.weekNumber,
              schedule.userName,
              schedule.listOfDayWorkouts
            );
          }
        ),
        catchError(this.handleError<Schedule>('getSchedule' + '/' + weekNumber))
      );
  }

  getUsers(): Observable<User[]> {
    console.log('get user');
    return this.http.get<UserType[]>(this.url).pipe(
      map(
        (
          Users: {
            index_nr: number;
            name: string;
            age: number;
            weight: number;
            height: number;
            gender: string;
          }[]
        ) =>
          Users.map((user) => {
            return new User(
              user.index_nr,
              user.name,
              user.age,
              user.weight,
              user.height,
              user.gender
            );
          })
      ),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }
  getAccounts(): Observable<LoginAccount[]> {
    console.log("get account");
    return this.http.get<LoginAccountType[]>(this.accountsUrl)
      .pipe(
         map((Accounts: {
          login:string,
          password:string,
          index_nr:number}[])=>Accounts.map(loginAccount=>{
          return new LoginAccount(loginAccount.login,loginAccount.password,loginAccount.index_nr);})
        ),
        catchError(this.handleError<LoginAccount[]>('getAccounts', []))
      );
  }

  editUser(user: UserType): Observable<UserType> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    console.log(user.index_nr);
    return this.http
      .put<UserType>(
        this.url + '/' + user.index_nr + '.json',
        user,
        httpOptions
      )
      .pipe(

        catchError(this.handleError<UserType>('editUser'))
      );
  }

  createUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    this.http
      .post<User>(this.url, user, httpOptions)
      .pipe(catchError(this.handleError<User>('createUser')))
      .subscribe((res) => {
        console.log(res);
      });
  }

  createSchedule(schedule: Schedule) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    this.http
      .post<Schedule>(this.scheduleUrl, schedule, httpOptions)
      .pipe(catchError(this.handleError<Schedule>('createSchedule')))
      .subscribe((res) => {
        console.log(res);
      });
  }

  addWorkoutToSchedule(schedule:Schedule){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
console.log(schedule.Index_nr)
    this.http
      .put<Schedule>(this.scheduleUrl+'/'+schedule.Index_nr, schedule, httpOptions)
      .pipe(catchError(this.handleError<Schedule>('editSchedule')))
      .subscribe((res) => {
        console.log(res);
      });
  }

  createAccount(account: RegistrationAccountType) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    this.http
      .post<RegistrationAccountType>(this.accountsUrl, account, httpOptions)
      .pipe(
        catchError(this.handleError<RegistrationAccountType>('createAccount'))
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    console.log('nie działa');
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }
}
