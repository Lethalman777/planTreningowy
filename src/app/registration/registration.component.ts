import { Component, Input, OnInit } from '@angular/core';
import * as e from 'express';
import { RegistrationAccount, RegistrationAccountType } from '../classes/registrationAccount';
import { User } from '../classes/user';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAccount } from '../classes/loginAccount';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input() registrationAccount!: RegistrationAccount;
  users!:User[]
  loginAccounts!:LoginAccount[]
  usersService: UsersService
  indexes:number[] = []
  index:number = 0
  isDataGood:boolean = true
  wrongs:string[]=[]

  constructor(usersService:UsersService, private router:Router) {
    this.usersService = usersService
    usersService.getUsers().subscribe(data=>this.users=data)
    usersService.getAccounts().subscribe(data=>this.loginAccounts=data)
   }

  ngOnInit(): void {
    this.registrationAccount = new RegistrationAccount("", "", "", new User(0,"", 0, 0, 0, ""), 0)
  }

  Registration(){
    while(this.wrongs.length > 0){
      this.wrongs.pop()
    }
      if(this.registrationAccount.Login.length < 3){
        console.log("za krotki login");
        this.isDataGood=false
        this.wrongs.push('Login musi mieć przynajmniej niż 3 znaki')
      }
      else{
        console.log("dobry login");
        this.isDataGood=true
      }
      if(this.registrationAccount.Password != this.registrationAccount.PasswordConfirmed){
        console.log("hasla są rózne");
        this.isDataGood=false
        this.wrongs.push('Wpisz powtórzenie hasła poprawnie')
      }
      else{
        console.log("dobre haslo");
        this.isDataGood=true
      }
      this.loginAccounts.forEach(element => {
        if(element.Login==this.registrationAccount.Login){
          console.log("istnieje już taki login");
        this.isDataGood=false
        this.wrongs.push('Wpisz inny login')
        }
      });
      if(this.isDataGood){
      this.index = 1
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
      this.router.navigate(['/plan'])
    }
  }

}
