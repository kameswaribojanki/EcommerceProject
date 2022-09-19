import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService:AuthService, private router:Router) { }
   loginForm:FormGroup=new FormGroup({
    email:new FormControl("",[Validators.required, Validators.email]),
    password:new FormControl("",[Validators.required, Validators.minLength(5),Validators.maxLength(10)]),
  });
  get emailError(){
    let emailMessage="";
    let emailControl=this.loginForm.get('email');
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

  get password(){
    return this.loginForm.get('password');
  }



  // get passwordError(){
  //   let passwordMessage="";
  //   let passwordControl=this.loginForm.get('password');
  //   if(passwordControl?.touched){
  //     passwordMessage="password should not be empty";
  //   }
  //   else if(passwordControl?.invalid){
  //     if(passwordControl?.errors?.['minLength']){
  //       passwordMessage="please enter valid password";
  //     }
  //     else if(passwordControl?.errors?.['maxLength']){
  //       passwordMessage="please enter valid password";
  //     }
  //   }
  //   return passwordMessage;
  // }
  
  ngOnInit(): void {
  }
  onLogin(){
    const email=this.loginForm.value.email;
    const password=this.loginForm.value.password;
    if(email && password){
      this.authService.login(email,password).subscribe(data=>{
        this.authService.logInEvent.emit(true);
        if(email=="kameswari@project.com" && password=="kameswari"){
          this.router.navigate(['/dashboard']);
          //console.log("success" +email+" "+password);
        }
        else{
        this.router.navigate(['/']);
        }
      })
    }

  }

}
