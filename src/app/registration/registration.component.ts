import { Component, Input, OnInit } from '@angular/core';
import * as e from 'express';
import { RegistrationAccount, RegistrationAccountType } from '../classes/registrationAccount';
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
    this.registrationAccount = new RegistrationAccount("", "", "", new User(0,"", 0, 0, 0, ""), 0)
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
      this.index = 0
      this.users.forEach(element => {
        this.indexes.push(element.Index_nr)
      });
      while(this.indexes.includes(this.index)){
        this.index++
      }
      this.registrationAccount.User.Index_nr = this.index
      this.registrationAccount.Index_nr = this.index
      this.usersService.createUser(this.registrationAccount.User)
      // this.registrationAccountType.login = this.registrationAccount.Login
      // this.registrationAccountType.password = this.registrationAccount.Password
      // this.registrationAccountType.index_nr = this.index
      const registrationAccountType : RegistrationAccountType = {
        login : this.registrationAccount.Login,
        password : this.registrationAccount.Password,
        index_nr : this.index
      }
      this.usersService.createAccount(registrationAccountType)
  }

}