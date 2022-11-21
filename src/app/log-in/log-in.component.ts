import { Component, Input, OnInit } from '@angular/core';
import { LoginAccount } from '../classes/loginAccount';
import { User } from '../classes/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  @Input() loginAccount!: LoginAccount;
  loginAccounts!:LoginAccount[]
  user:User = new User(1,"",0,0,0,"")
  users:User[]=[]
  i:number = 0
  constructor(usersService:UsersService) {
    usersService.getAccounts().subscribe(data=>this.loginAccounts=data)
    usersService.getUsers().subscribe(data=>this.users=data)
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
  }

}
