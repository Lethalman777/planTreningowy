import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { User, UserType } from '../classes/user';
import { UsersService } from '../users.service';
@Component({
  selector: 'edit-user',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() user!: User;
  @Input() selected!:number
  usersService:UsersService
  userCopy: User = new User(0,"",0,0,0,"")
  @Output() messageEvent = new EventEmitter<number>();
  @Output("editMethod") doEditInParent=new EventEmitter<{student:User,which:number}>();

  constructor(usersService: UsersService) {
    this.usersService = usersService
   }

  save():void{
    console.log("edited student",this.user,this.selected);
    this.userCopy.Index_nr=this.user.Index_nr
    this.userCopy.Name=this.user.Name
    this.userCopy.Height=this.user.Height
    this.userCopy.Weight=this.user.Weight
    this.userCopy.Gender=this.user.Gender
    this.usersService.editUser(new User(0,"",1,1,1,"")).subscribe(ret=>  {
      console.log("ret",ret);
      this.user=this.user}
      //pobieramy dane getem
      );
      this.messageEvent.emit(-1);
  }

  ngOnInit(): void {
  }

  // doEdit(data:{user:User,which:number}){
  //   console.log("edited student",data.user,data.which);
  //   this.usersService.editUser(data.user).subscribe(ret=>  {
  //     console.log("ret",ret);
  //     this.user=data.user}
  //     //pobieramy dane getem
  //     );
  //     this.messageEvent.emit(-1);
  // }

}
