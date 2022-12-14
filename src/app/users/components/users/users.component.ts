import { Component, OnInit } from '@angular/core';
import { IUserDetails } from '../../models/IUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:IUserDetails[]=[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data=>{
      this.users=data;
    })
  }
}
