import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./Auth/components/login/login.component";
import { RegisterComponent } from "./Auth/components/register/register.component";

@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent,
    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule
    ],
    exports:[
        LoginComponent,
        RegisterComponent,
    ]
})
export class AuthModule{

}