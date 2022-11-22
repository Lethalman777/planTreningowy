import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { User, UserType } from '../classes/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  usersService:UsersService
  constructor(usersService: UsersService) {
    this.usersService = usersService
   }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
