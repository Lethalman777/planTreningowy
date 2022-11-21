import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'edit-user',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() user!: User;
  @Output() messageEvent = new EventEmitter<number>();

  constructor() { }

  save():void{
    this.messageEvent.emit(-1);
  }

  ngOnInit(): void {
  }

}
