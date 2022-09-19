import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ICategory } from "../models/ICategory";

@Injectable({
    providedIn:'root'
})
export class CategoryService{
    categoryChangeFlag=false;
    baseUrl=`https://ecommerce-6e1da-default-rtdb.firebaseio.com/`;
    categoryChangeEvent=new EventEmitter<boolean>;
    setCategoryChange(msg:boolean){
      this.categoryChangeEvent.emit(msg);
    }
    constructor(private http:HttpClient){

    }
    addCategory(category:ICategory):Observable<any>{
        return this.http.post<{name:string}>(`${this.baseUrl}categories.json`, category);
    }
    getCategories():Observable<ICategory[]>{
        return this.http.get<{[id:string]:ICategory}[]>(`${this.baseUrl}categories.json`).pipe(map(categories=>{
            let formattedCategories:ICategory[]=[];
            for (let id in categories) {
                formattedCategories.push({ id, ...categories[id] } as ICategory);
              }
              return formattedCategories;
        }))
    }
    getCategoryById(id:string){
        return this.http.get<ICategory>(`${this.baseUrl}/categories/${id}.json`);
      }
      editCategory(category:ICategory,id:string){
        return this.http.put(`${this.baseUrl}categories/${id}.json`,category);
      }
      deleteCategory(id:string){
        return this.http.delete(`${this.baseUrl}/categories/${id}.json`);
      }
}