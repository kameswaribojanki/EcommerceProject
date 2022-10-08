import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ISubCategory } from "../models/ISubCategory";

@Injectable({
    providedIn:'root'
})
export class SubCategoryService{
    categoryChangeFlag=false;
    // baseUrl=`https://ecommerce-6e1da-default-rtdb.firebaseio.com/`;
    baseUrl=environment.firebaseUrl;
    categoryChangeEvent=new EventEmitter<boolean>;
    setSubCategoryChange(msg:boolean){
      this.categoryChangeEvent.emit(msg);
    }
    constructor(private http:HttpClient){

    }
    addSubCategory(category:ISubCategory):Observable<any>{
        return this.http.post<{name:string}>(`${this.baseUrl}subCategories.json`, category);
    }
    getSubCategories():Observable<ISubCategory[]>{
        return this.http.get<{[id:string]:ISubCategory}[]>(`${this.baseUrl}subCategories.json`).pipe(map(categories=>{
            let formattedCategories:ISubCategory[]=[];
            for (let id in categories) {
                formattedCategories.push({ id, ...categories[id] } as ISubCategory);
              }
              return formattedCategories;
        }))
    }
    getSubCategoryById(id:string){
        return this.http.get<ISubCategory>(`${this.baseUrl}/subCategories/${id}.json`);
      }
      editSubCategory(category:ISubCategory,id:string){
        return this.http.put(`${this.baseUrl}subCategories/${id}.json`,category);
      }
      deleteSubCategory(id:string){
        return this.http.delete(`${this.baseUrl}/subCategories/${id}.json`);
      }
}