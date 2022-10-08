import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserDetails } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  categoryChangeFlag=false;
    // baseUrl=`https://ecommerce-6e1da-default-rtdb.firebaseio.com/`;
    baseUrl=environment.firebaseUrl;
    categoryChangeEvent=new EventEmitter<boolean>;
    setSubCategoryChange(msg:boolean){
      this.categoryChangeEvent.emit(msg);
    }
    constructor(private http:HttpClient){

    }
    addUser(user:IUserDetails):Observable<any>{
        return this.http.post<{name:string}>(`${this.baseUrl}users.json`, user);
    }
    getUsers():Observable<IUserDetails[]>{
        return this.http.get<{[id:string]:IUserDetails}[]>(`${this.baseUrl}users.json`).pipe(map(users=>{
            let formattedUsers:IUserDetails[]=[];
            for (let id in users) {
              formattedUsers.push({ id, ...users[id] } as IUserDetails);
              }
              return formattedUsers;
        }))
    }
    getUsersById(id:string){
        return this.http.get<IUserDetails>(`${this.baseUrl}/users/${id}.json`);
      }
      editUser(user:IUserDetails,id:string){
        return this.http.put(`${this.baseUrl}users/${id}.json`,user);
      }
      deleteUser(id:string){
        return this.http.delete(`${this.baseUrl}/users/${id}.json`);
      }
}
