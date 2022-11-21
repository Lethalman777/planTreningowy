import { Component, Input, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'print-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() Index_nr: number = 0
  @Input() user!: User;
  @Input() prefix!: string;
  users!: User[]
  constructor(usersService: UsersService) {

    usersService.getUsers().subscribe(data=>this.users = data)
    usersService.getUser(1).subscribe(data=>this.user=data)
   }

  ngOnInit(): void {
  }

}
