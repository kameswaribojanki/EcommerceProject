import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/services/auth.service';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges{
  isLogIn=false;
  filteredString:string="";
  count=0;
  
  constructor(private authService:AuthService, private router:Router,private productService:ProductService) {
    
   }
  ngOnChanges(): void {
    console.log("hello");
  }

  ngOnInit(): void {
    // this.productService.filterString=this.filteredString;
    this.isLogIn=this.authService.userDetails?true:false;
    this.authService.logInEvent.subscribe(data=>{
      this.isLogIn=data;
    })
    console.log(this.filteredString);
  }
  onLogOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }
  onCartClick(){
    this.router.navigate(['cart']);
  }
}
