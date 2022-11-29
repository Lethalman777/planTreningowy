import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { User, UserType } from '../classes/user';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'edit-user',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  index_nr!:number
  @Input() user!: User;
  @Input() selected!:number
  usersService:UsersService
  @Output() messageEvent = new EventEmitter<number>();
  @Output("editMethod") doEditInParent=new EventEmitter<{student:User,which:number}>();

  constructor(usersService: UsersService, private router:Router, private route:ActivatedRoute) {
    this.usersService = usersService
   }

  save():void{
    console.log("edited student",this.user,this.selected);
    const userCopy : UserType = {
    index_nr:this.user.Index_nr,
    name:this.user.Name,
    age:this.user.Age,
    weight:this.user.Weight,
    height:this.user.Height,
    gender:this.user.Gender
    }
    this.usersService.editUser(userCopy).subscribe(ret=>  {
      console.log("ret",ret);
      }
      //pobieramy dane getem
      );
      this.messageEvent.emit(-1);
      this.router.navigate(['/users',this.user.Index_nr])
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //this.id = Number(params['id']);
      this.index_nr = Number(this.route.snapshot.paramMap.get('id'))
      this.usersService.getUser(this.index_nr).subscribe(data=>this.user=data)
  })
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
