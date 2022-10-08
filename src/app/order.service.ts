import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserOrder } from './IUserOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl=environment.firebaseUrl;
  constructor(private http:HttpClient) { }
  addOrderDetails(order:IUserOrder,userId:string):Observable<{id:string}>{
    return this.http.post<{id:string}>(`${this.baseUrl}Orders/${userId}/.json`, order);
  }
  getOrders(userId:string):Observable<IUserOrder[]>{
    return this.http.get<{[id:string]:IUserOrder}[]>(`${this.baseUrl}Orders/${userId}/.json`).pipe(map(orders=>{
        let formattedOrders:IUserOrder[]=[];
        for (let id in orders) {
          formattedOrders.push({ id, ...orders[id] } as IUserOrder);
          }
          return formattedOrders;
    }))
  }
  getAllOrders():Observable<IUserOrder[]>{
    return this.http.get<{[id:string]:IUserOrder}[]>(`${this.baseUrl}Orders/.json`).pipe(map(orders=>{
        let formattedOrders:IUserOrder[]=[];
        for (let id in orders) {
          formattedOrders.push({ id, ...orders[id] } as IUserOrder);
          }
          return formattedOrders;
    }))
  }
}
