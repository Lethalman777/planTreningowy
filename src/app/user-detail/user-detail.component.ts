import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../users.service';
import { User } from '../classes/user';
import { LoginAccount } from '../classes/loginAccount';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
user!:User;
users:User[]=[];
  constructor(private route: ActivatedRoute, private router:Router, private usersService: UsersService, private location: Location){
  }
id:any;
  ngOnInit(): void{
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
public deleteUser(){
  this.usersService.deleteUser(this.id)
  this.usersService.deleteAccount(this.id)
  this.router.navigate(['/log-in'])
}

  goBack(): void{
    this.location.back();
  }

}
