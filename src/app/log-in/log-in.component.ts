import { Component, Input, OnInit } from '@angular/core';
import { LoginAccount } from '../classes/loginAccount';
import { User } from '../classes/user';
import { Workout } from '../classes/workout';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  @Input() loginAccount!: LoginAccount;
  loginAccounts:LoginAccount[] = []
  workouts:Workout[]=[]
  user:User = new User(2,"",0,0,0,"")
  users:User[]=[]
  i:number = 0
  isLoged:boolean = false
  usersService: UsersService

  constructor(usersService:UsersService) {
    this.usersService = usersService
    usersService.getAccounts().subscribe(data=>this.loginAccounts=data)
    usersService.getUsers().subscribe(data=>this.users=data)
    usersService.getWorkouts().subscribe(data=>this.workouts=data)

    this.i=0
   }

  ngOnInit(): void {
    this.loginAccount = new LoginAccount("","",0);
  }

  LogIn() {
    if(this.loginAccount.Login.length < 3){
      console.log("za krotki login");
    }
    else{
      console.log("dobry login");
    }
    if(this.loginAccount.Password.length < 3){
      console.log("za krotkie haslo");
    }
    else{
      console.log("dobre haslo");
    }
    this.loginAccounts.forEach(element => {
      if(element.Login === this.loginAccount.Login && element.Password === this.loginAccount.Password){
        console.log(this.loginAccount.Login)
    console.log(this.loginAccount.Password)
        this.usersService.getUser(element.Index_nr).subscribe(data=>this.user=data)
        console.log(this.user.Index_nr)

          // return this.usersService.getUser(this.user.Index_nr).subscribe(user => this.user = user);
        }});

  }

}




