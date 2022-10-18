import { Component, OnInit } from '@angular/core';
import { IUserPayment } from '../IUserPayment';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {
  allPayments:IUserPayment[]=[];
  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.paymentService.getAllPayments().subscribe(data=>{
      this.allPayments=data;
    })
  }

}
