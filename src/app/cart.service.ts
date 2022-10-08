import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { EventEmitter, Injectable } from "@angular/core";
import { ICart } from "./ICart";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn:"root"
})
export class CartService{
    // baseUrl=`https://ecommerce-6e1da-default-rtdb.firebaseio.com/`;
    baseUrl=environment.firebaseUrl;
    productChangeEvent=new EventEmitter<boolean>;
    filterString:string="";
    products:ICart[]=[];
    setProductChange(msg:boolean){
      this.productChangeEvent.emit(msg);
    }
    constructor(private http:HttpClient){
    }
    addProductToCart(product:ICart,userId:string):Observable<any>{
        return this.http.post<{name:string}>(`${this.baseUrl}cart/${userId}/.json`, product);
    }
    getProducts(userId:string):Observable<ICart[]>{
        return this.http.get<{[id:string]:ICart}[]>(`${this.baseUrl}cart/${userId}/.json`).pipe(map(products=>{
            let formattedProducts:ICart[]=[];
            for (let id in products) {
                formattedProducts.push({ id, ...products[id] } as ICart);
              }
              return formattedProducts;
        }))
    }
    getProductById(id:string){
      return this.http.get<ICart>(`${this.baseUrl}/cart/${id}.json`);
    }
    editProduct(product:ICart,id:string, userId:string){
      return this.http.put(`${this.baseUrl}cart/${userId}/${id}.json`,product);
    }
    deleteProduct(id:string,userId:string){
      return this.http.delete(`${this.baseUrl}/cart/${userId}/${id}.json`);
    }
    deleteAll(){
      return this.http.delete(`${this.baseUrl}/cart.json`);
    }
}
