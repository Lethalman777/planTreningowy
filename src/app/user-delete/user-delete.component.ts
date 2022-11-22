import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { User, UserType } from '../classes/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'delete-user',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})

export class UserDeleteComponent {
  @Input() user!: User;
@Input() selected!:number
usersService:UsersService
  constructor(usersService: UsersService) {
    this.usersService = usersService
   }

   delete(){
    this.usersService.deleteUser(this.user)
   }
}
