import { Component, OnInit } from '@angular/core';
import { IUser } from '../Auth/models/IUser';
import { IUserOrder } from '../IUserOrder';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders:IUserOrder[]=[];
  userId:string='';
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    let userDetailsJSON=localStorage.getItem("userDetails");
    let userDetails!: IUser;
    if (userDetailsJSON) userDetails = JSON.parse(userDetailsJSON);
    this.userId = userDetails.userId;
    this.orderService.getOrders(this.userId).subscribe(data=>{
      this.orders=data;
    })
  }

}
