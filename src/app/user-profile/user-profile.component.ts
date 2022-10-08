import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../Auth/services/auth.service';
import { IUserDetails } from '../users/models/IUser';
import { UserService } from '../users/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:IUserDetails[]=[];
  id!:any;
  name!:string;
  constructor(private authService:AuthService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    let user=this.authService.userDetails;
    let email=user?.email;
    this.userService.getUsers().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        if(email==data[i].email){
          this.id=data[i].id;
        }
        this.userService.getUsersById(this.id).subscribe(data=>{
          this.name=data.name;
        })
      }
    })
  }
  onLogOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
