import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IProduct } from "./products/models/IProduct";

@Injectable({
    providedIn:'root'
})
export class WishListService{
    categoryChangeFlag=false;
    // baseUrl=`https://ecommerce-6e1da-default-rtdb.firebaseio.com/`;
    baseUrl=environment.firebaseUrl;
    wishListChangeEvent=new EventEmitter<boolean>;
    setWishListChange(msg:boolean){
      this.wishListChangeEvent.emit(msg);
    }
    constructor(private http:HttpClient){

    }
    addWishList(wishList:IProduct,userId:string):Observable<any>{
        return this.http.post<{name:string}>(`${this.baseUrl}wishList/${userId}/.json`, wishList);
    }
    getWishList(userId:string):Observable<IProduct[]>{
        return this.http.get<{[id:string]:IProduct}[]>(`${this.baseUrl}wishList/${userId}/.json`).pipe(map(wishList=>{
            let formattedwishLists:IProduct[]=[];
            for (let id in wishList) {
                formattedwishLists.push({ id, ...wishList[id] } as IProduct);
              }
              return formattedwishLists;
        }))
    }
    getWishListById(id:string){
        return this.http.get<IProduct>(`${this.baseUrl}/wishList/${id}.json`);
      }
      editWishList(wishList:IProduct,id:string,userId:string){
        return this.http.put(`${this.baseUrl}wishList/${userId}/${id}.json`,wishList);
      }
      deleteWishList(id:string,userId:string){
        return this.http.delete(`${this.baseUrl}/wishList/${userId}/${id}.json`);
      }
      deleteAll(){
        return this.http.delete(`${this.baseUrl}/wishList.json`);
      }
}