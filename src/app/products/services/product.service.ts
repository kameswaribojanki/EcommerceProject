import { HttpClient } from "@angular/common/http";
import { IProduct } from "../models/IProduct";
import { map, Observable } from "rxjs";
import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn:"root"
})
export class ProductService{
    // baseUrl=`https://ecommerce-6e1da-default-rtdb.firebaseio.com/`;
    baseUrl=environment.firebaseUrl;
    productChangeEvent=new EventEmitter<boolean>;
    filterString:string="";
    products:IProduct[]=[];
    setProductChange(msg:boolean){
      this.productChangeEvent.emit(msg);
    }
    constructor(private http:HttpClient){
    }
    addProduct(product:IProduct):Observable<any>{
        return this.http.post<{name:string}>(`${this.baseUrl}products.json`, product);
    }
    getProducts():Observable<IProduct[]>{
        return this.http.get<{[id:string]:IProduct}[]>(`${this.baseUrl}products.json`).pipe(map(products=>{
            let formattedProducts:IProduct[]=[];
            for (let id in products) {
                formattedProducts.push({ id, ...products[id] } as IProduct);
              }
              return formattedProducts;
        }))
    }
    getProductById(id:string){
        return this.http.get<IProduct>(`${this.baseUrl}/products/${id}.json`);
      }
      editProduct(product:IProduct,id:string){
        return this.http.put(`${this.baseUrl}products/${id}.json`,product);
      }
      deleteProduct(id:string){
        return this.http.delete(`${this.baseUrl}/products/${id}.json`);
      }
}