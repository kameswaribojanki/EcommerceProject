import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../Auth/models/IUser';
import { AuthService } from '../Auth/services/auth.service';
import { CartService } from '../cart.service';
import { ProductService } from '../products/services/product.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLogIn!:boolean;
  filteredString:string="";
  count:number=0;
  constructor(private authService:AuthService, private router:Router,private productService:ProductService, private cartService:CartService, private searchService:SearchService) {
   }
  ngOnInit(): void {
    let userDetailsJSON=localStorage.getItem("userDetails");
    let userDetails!: IUser;
    if (userDetailsJSON) userDetails = JSON.parse(userDetailsJSON);

    this.cartService.getProducts(userDetails.userId).subscribe(data=>{
      this.count=data.length;
    })
    this.authService.getDataFromLocalStorage();
    this.isLogIn=this.authService.userDetails?true:false;
    this.authService.logInEvent.subscribe(data=>{
      this.isLogIn=data;
    })
    console.log(this.filteredString);
    console.log(this.count);
  }
  onLogoClick(){
    this.router.navigate(['/']);
  }
  onLogOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }
  onCartClick(){
    this.router.navigate(['cart']);
  }
  onInputChange(event:any){
    this.searchService.searchProduct.next(event.target.value);
  }
}
