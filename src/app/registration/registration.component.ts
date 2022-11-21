import { Component, Input, OnInit } from '@angular/core';
import * as e from 'express';
import { RegistrationAccount } from '../classes/registrationAccount';
import { User } from '../classes/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input() registrationAccount!: RegistrationAccount;
  users!:User[]
  usersService: UsersService
  indexes:number[] = []
  index:number = 0

  constructor(usersService:UsersService) {
    this.usersService = usersService
    usersService.getUsers().subscribe(data=>this.users=data)
   }

  ngOnInit(): void {
    this.registrationAccount = new RegistrationAccount("", "", "", new User(0,"", 0, 0, 0, ""))
  }

  Registration(){
      if(this.registrationAccount.Login.length < 3){
        console.log("za krotki login");
      }
      else{
        console.log("dobry login");
      }
      if(this.registrationAccount.Password != this.registrationAccount.PasswordConfirmed){
        console.log("hasla są rózne");
      }
      else{
        console.log("dobre haslo");
      }
      // this.index = 0
      // this.users.forEach(element => {
      //   if(element.Index_nr == this.index)
      //   this.index++
      // });
      this.registrationAccount.User.Index_nr = this.users.length
      this.usersService.createUser(this.registrationAccount.User)
  }

}
