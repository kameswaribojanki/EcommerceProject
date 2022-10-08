import { Component, OnInit } from '@angular/core';
import { IUser } from '../Auth/models/IUser';
import { IUserPayment } from '../IUserPayment';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.css']
})
export class MyPaymentsComponent implements OnInit {
  payments:IUserPayment[]=[];
  userId:string='';
  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void {
    let userDetailsJSON=localStorage.getItem("userDetails");
    let userDetails!: IUser;
    if (userDetailsJSON) userDetails = JSON.parse(userDetailsJSON);
    this.userId = userDetails.userId;
    this.paymentService.getPayments(this.userId).subscribe(data=>{
      this.payments=data;
    })
  }

}
