import { Component, Input, OnInit } from '@angular/core';
import { LoginAccount } from '../classes/loginAccount';
import { User } from '../classes/user';
import { Workout } from '../classes/workout';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  @Input() loginAccount!: LoginAccount;
  loginAccounts:LoginAccount[] = []
  workouts:Workout[]=[]
  user:User = new User(1,"",0,0,0,"")
  users:User[]=[]
  i:number = 0
  isWrongData:boolean = false
  usersService: UsersService

  constructor(usersService:UsersService, private router: Router) {
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
    this.isWrongData=false
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
    }console.log(this.users.length)
    this.loginAccounts.forEach(element => {
      if(element.Login === this.loginAccount.Login && element.Password === this.loginAccount.Password){
        console.log(this.loginAccount.Login)
        console.log(this.loginAccount.Password)
        console.log(this.loginAccounts.length)
        this.users.forEach(element1 => {
          if(element.Index_nr==element1.Index_nr){
            this.user=element1
            console.log(this.user.Index_nr)
            this.router.navigate(['/users',this.user.Index_nr])
          }
        });

          // return this.usersService.getUser(this.user.Index_nr).subscribe(user => this.user = user);
        }});
        this.isWrongData=true;
  }
}




