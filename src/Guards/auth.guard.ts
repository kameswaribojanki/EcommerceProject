import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/Auth/services/auth.service";
@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(private router:Router, private authService:AuthService){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // throw new Error("Method not implemented.");
        let userDetails=this.authService.userDetails;
        if(userDetails){
            return true;
        }
        return this.router.navigate(['/login']);
    }

}