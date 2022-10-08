import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users/services/user.service';
import { AuthService } from '../../services/auth.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService:AuthService, private router:Router, private userService:UserService) { }
    registerForm:FormGroup=new FormGroup({
    name:new FormControl("",[Validators.required]),
    phone:new FormControl("",Validators.required),
    email:new FormControl("", [Validators.required, Validators.email]),
    password:new FormControl("",[Validators.required, Validators.minLength(5),Validators.maxLength(9)]),
    surname:new FormControl("",[Validators.required]),
    state:new FormControl("",[Validators.required]),
    city:new FormControl("",[Validators.required]),
    pincode:new FormControl("",[Validators.required]),
    gender:new FormControl("",[Validators.required]),
    dob:new FormControl("",[Validators.required]),
    address:new FormControl("",[Validators.required])
  });
  get emailError(){
    let emailMessage="";
    let emailControl=this.registerForm.get('email');
    if(emailControl?.touched){
      if(emailControl?.errors?.['required']){
        emailMessage="email should not be empty";
      }
      else if(emailControl?.errors?.['email']){
        emailMessage="email should be valid";
      }
    }
    return emailMessage;
  }

  get nameError(){
    let nameMessage="";
    let nameControl=this.registerForm.get('name');
    if(nameControl?.touched){
      if(nameControl?.errors?.['required']){
        nameMessage="please enter name";
      }
    }
    return nameMessage;
  }

  get phoneError(){
    let phoneMessage="";
    let phoneControl=this.registerForm.get('phone');
    if(phoneControl?.touched){
      if(phoneControl?.errors?.['required']){
        phoneMessage="please enter phone number";
      }
    }
    return phoneMessage;
  }

  get password(){
    return this.registerForm.get('password');
  }
  ngOnInit(): void {
  }
  onRegister(){
    let userDetails=this.registerForm.value;
    userDetails.userId=Guid.create().toString();
    console.log(userDetails.userId);
    this.userService.addUser(userDetails).subscribe(data=>{
    })
    const email=this.registerForm.value.email;
    const password=this.registerForm.value.password;
    if(email && password){
      this.authService.register(email,password).subscribe(data=>{
        //this.authService.logInEvent.emit(true);
        this.router.navigate(['login']);
      })
    }
  }

}
