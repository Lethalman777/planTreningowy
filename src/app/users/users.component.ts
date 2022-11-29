import { Component, Input, OnInit } from '@angular/core';
import { LoginAccount } from '../classes/loginAccount';
import { User } from '../classes/user'
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[]=[];
  user!: User
  selected: number = -1;
  accounts: LoginAccount[]=[]
  id:any;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private location: Location) {
    usersService.getUsers().subscribe(data=>this.users = data)
    console.log(this.users.length)
    usersService.getAccounts().subscribe(data=>this.accounts=data)
  }

  select(index: number){
    this.selected = index;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //this.id = Number(params['id']);
      this.id = this.route.snapshot.paramMap.get('id')
  })
  this.getUser();
  }
  getUser(): void{
    console.log(this.id)
    this.usersService.getUser(this.id).subscribe(users => this.user = users);
  //   console.log(this.users.length)
  //   this.users.forEach(element => {
  //     console.log(element.Index_nr)
  //    if(element.Index_nr == this.id){

  //       this.user = element
  //    }
  // })
  console.log(this.user)
}

  goBack(): void{
    this.location.back();
  }

  find(index: number){
    const usr = this.users.find(x => x.Index_nr === index);
    return usr;
  }

}
