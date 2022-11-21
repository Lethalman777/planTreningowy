import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, UserType } from './classes/user';
import { catchError, map } from 'rxjs/operators';
import { LoginAccount, LoginAccountType } from './classes/loginAccount';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private url = 'http://localhost:7777/users';
  private accountsUrl = 'http://localhost:7777/accounts';

  constructor(private http: HttpClient) { }

  getUser(index_nr:number): Observable<User> {
    console.log("get user"+index_nr);
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    return this.http.get<User>(this.url+'/'+index_nr)
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
    return this.http.put<User>(this.url+'/'+user.Index_nr, user, httpOptions)
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

    this.http.put<User>(this.url+'/users.json', user, httpOptions)
      .pipe(

        catchError(this.handleError<User>('createUser'))
      ).subscribe((res)=>{
        console.log(res)
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }
}
