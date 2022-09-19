import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }
    registerForm:FormGroup=new FormGroup({
    name:new FormControl("",[Validators.required]),
    phone:new FormControl("",Validators.required),
    email:new FormControl("", [Validators.required, Validators.email]),
    password:new FormControl("",[Validators.required, Validators.minLength(5),Validators.maxLength(8)]),
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
    const email=this.registerForm.value.email;
    const password=this.registerForm.value.password;
    if(email && password){
      this.authService.register(email,password).subscribe(data=>{
        this.authService.logInEvent.emit(true);
        this.router.navigate(['/']);
      })
    }
  }

}
