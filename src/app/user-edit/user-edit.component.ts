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
  @Output() messageEvent = new EventEmitter<number>();
  @Output("editMethod") doEditInParent=new EventEmitter<{student:User,which:number}>();

  constructor(usersService: UsersService) {
    this.usersService = usersService
   }

  save():void{
    console.log("edited student",this.user,this.selected);
    const userCopy : UserType = {
    index_nr:this.user.Index_nr,
    name:this.user.Name,
    age:this.user.Age,
    height:this.user.Height,
    weight:this.user.Weight,
    gender:this.user.Gender,
    }
    this.usersService.editUser(userCopy).subscribe(ret=>  {
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
