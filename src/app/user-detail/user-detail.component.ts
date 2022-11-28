import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../users.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
user:User |undefined;
users:User[]=[];

  constructor(private route: ActivatedRoute, private usersService: UsersService, private location: Location){}
id:any;
  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
  })
  this.getUser();
}

  getUser(): void{
    this.usersService.getUsers().subscribe(users => this.users = users);
    this.users.forEach(element => {
     if(element.Index_nr == this.id){
        this.user = element
     }
  })
  console.log(this.user)
}

  goBack(): void{
    this.location.back();
  }

}
