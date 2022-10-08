import { Component, OnInit } from '@angular/core';
import { IUserOrder } from '../IUserOrder';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  allOrders:IUserOrder[]=[];
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(data=>{
      this.allOrders=data;
      console.log(data);
    })
  }

}
