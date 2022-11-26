import { Component, Input, OnInit } from '@angular/core';
import { LoginAccount } from '../classes/loginAccount';
import { User } from '../classes/user'
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[]=[];
  selected: number = -1;
  accounts: LoginAccount[]=[]

  constructor(usersService: UsersService) {
    usersService.getUsers().subscribe(data=>this.users = data)
    usersService.getAccounts().subscribe(data=>this.accounts=data)
     this.users.push(new User(0,"Eryk", 22, 70, 178, "male"));
     this.users.push(new User(0,"Dawid", 21, 105, 200, "male"));
     this.users.push(new User(0,"Łukasz", 19, 100, 199, "male"));
     this.users.push(new User(0,"Dominika", 22, 70, 178, "i dont know"));
  }

  select(index: number){
    this.selected = index;
  }

  ngOnInit(): void {
  }

}
