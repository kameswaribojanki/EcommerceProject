import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../Auth/services/auth.service';
import { IUserDetails } from '../users/models/IUser';
import { UserService } from '../users/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users:IUserDetails[]=[];
  filteredUser!:IUserDetails;
  id!:any;
  userDetailsForm:FormGroup=new FormGroup({
    name:new FormControl(''),
    surname:new FormControl(""),
    phone:new FormControl(""),
    email:new FormControl(""),
    state:new FormControl(""),
    city:new FormControl(""),
    pincode:new FormControl(""),
    gender:new FormControl(""),
    dob:new FormControl(""),
    address:new FormControl(""),
    password:new FormControl(""),
  })
  constructor(private authService:AuthService, private userService:UserService) { }

  ngOnInit(): void {
    let user=this.authService.userDetails;
    let email=user?.email;
    this.userService.getUsers().subscribe(data=>{
      this.users=data;
      for(let i=0;i<data.length;i++){
        if(email==data[i].email){
          this.id=data[i].id;
        }
      }
      this.userService.getUsersById(this.id).subscribe(data=>{
        this.filteredUser=data;
        this.userDetailsForm.setValue({
          name:data.name,
          surname:data.surname,
          phone:data.phone,
          email:data.email,
          state:data.state,
          city:data.city,
          pincode:data.pincode,
          gender:data.gender,
          dob:data.dob,
          address:data.address,
          password:data.password,
        })
      })
    }) 
  }
  onUpdateUserDetails(){
    let user=this.authService.userDetails;
    let email=user?.email;
    let updatedUser=this.userDetailsForm.value;
    this.userService.getUsers().subscribe(data=>{
      this.users=data;
      for(let i=0;i<data.length;i++){
        if(email==data[i].email){
          this.id=data[i].id;
        }
        this.userService.editUser(updatedUser,this.id).subscribe(data=>{

        })
      }
    })
  }
}
