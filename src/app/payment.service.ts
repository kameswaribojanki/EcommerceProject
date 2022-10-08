import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserPayment } from './IUserPayment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl=environment.firebaseUrl;
  constructor(private http:HttpClient) { }
  addPaymentDetails(payment:IUserPayment,userId:string):Observable<any>{
    return this.http.post<{name:string}>(`${this.baseUrl}Payments/${userId}/.json`, payment);
  }
  getPayments(userId:string):Observable<IUserPayment[]>{
    return this.http.get<{[id:string]:IUserPayment}[]>(`${this.baseUrl}Payments/${userId}/.json`).pipe(map(payments=>{
        let formattedPayments:IUserPayment[]=[];
        for (let id in payments) {
          formattedPayments.push({ id, ...payments[id] } as IUserPayment);
          }
          return formattedPayments;
    }))
  }
}
