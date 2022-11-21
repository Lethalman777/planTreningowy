import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, UserType } from './classes/user';
import { Workout, WorkoutType } from './classes/workout';
import { catchError, map } from 'rxjs/operators';
import { LoginAccount, LoginAccountType } from './classes/loginAccount';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private url = 'http://localhost:7777/users';
  private accountsUrl = 'http://localhost:7777/accounts';
  private workoutsUrl = 'http://localhost:7777/workouts';

  constructor(private http: HttpClient) { }

  getUser(index_nr:number): Observable<User> {
    console.log("get user"+index_nr);
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
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

  getWorkouts(): Observable<Workout[]> {
    console.log("get workout");
    return this.http.get<WorkoutType[]>(this.workoutsUrl)
      .pipe(
         map((Workouts: {
          index_nr:number,
          name:string,
          description:string}[])=>Workouts.map(workout=>{
          return new Workout(workout.index_nr,workout.name, workout.description );})
        ),
        catchError(this.handleError<Workout[]>('getWorkouts', []))
      );
  }

  getUsers(): Observable<User[]> {
    console.log("get user");
    return this.http.get<UserType[]>(this.url)
      .pipe(
         map((Users: {index_nr:number,
          name:string,
          age:number,
          weight:number,
          height:number,
          gender:string}[])=>Users.map(user=>{
          return new User(user.index_nr,user.name,user.age,user.weight,user.height,user.gender);})
        ),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  editUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // const studentObj={name: student.Name, surname: student.Surname, index_nr: student.Index_nr, dataUrodzenia: student.dataUrodzenia};
    // if((student as OutstandingStudentClass).stypendium!==undefined) Object.assign(studentObj, {stypendium: (student as OutstandingStudentClass).stypendium});
    // console.log("edit",studentObj);
    console.log("dziala")
    return this.http.put<User>(this.url+'/'+user.Index_nr+'.json', user, httpOptions)
      .pipe(
        // tu ładnie konwersja działa, niepotrzebne
        // map((studentret: Student)=>{
        // if(studentret.stypendium) return new OutstandingStudentClass(studentret.name,studentret.surname,studentret.index_nr,studentret.stypendium,studentret.dataUrodzenia);
        // return new StudentClass(studentret.name,studentret.surname,studentret.index_nr,studentret.dataUrodzenia);}),
        catchError(this.handleError<User>('editUser'))
      );
  }

  createUser(user: User){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post<User>(this.url, user, httpOptions)
      .pipe(

        catchError(this.handleError<User>('createUser'))
      ).subscribe((res)=>{
        console.log(res)
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    console.log('nie działa')
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }
}
