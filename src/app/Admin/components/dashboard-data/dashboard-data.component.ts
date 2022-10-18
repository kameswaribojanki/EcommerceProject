import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Auth/models/IUser';
import { CategoryService } from 'src/app/categories/services/category.service';
import { OrderService } from 'src/app/order.service';
import { ProductService } from 'src/app/products/services/product.service';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-dashboard-data',
  templateUrl: './dashboard-data.component.html',
  styleUrls: ['./dashboard-data.component.css']
})
export class DashboardDataComponent implements OnInit {
  pcount=0;
  ccount=0;
  ucount=0;
  ocount=0;
  constructor(private productService:ProductService, private categoryService:CategoryService, private userService:UserService, private orderService:OrderService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>{
      this.pcount=data.length;
    })
    this.categoryService.getCategories().subscribe(data=>{
      this.ccount=data.length;
    })
    this.userService.getUsers().subscribe(data=>{
      this.ucount=data.length;
    })
    this.orderService.getAllOrders().subscribe(data=>{
      this.ocount=data.length;
    })
  }

}
