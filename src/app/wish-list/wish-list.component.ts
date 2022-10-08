import { Component, OnInit } from '@angular/core';
import { IUser } from '../Auth/models/IUser';
import { IProduct } from '../products/models/IProduct';
import { WishListService } from '../wishList.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishList:IProduct[]=[];
  userId:string='';
  constructor(private wishListService:WishListService) { }

  ngOnInit(): void {
    let userDetailsJSON=localStorage.getItem("userDetails");
    let userDetails!: IUser;
    if (userDetailsJSON) userDetails = JSON.parse(userDetailsJSON);
    this.userId = userDetails.userId;
    this.wishListService.wishListChangeEvent.subscribe(data=>{
      this.wishListService.getWishList(this.userId).subscribe(data=>{
        this.wishList=data;
      })
    })
    this.wishListService.getWishList(userDetails.userId).subscribe(data=>{
      this.wishList=data;
    })
  }
  deleteFromWishList(product:any){
    this.wishListService.deleteWishList(product,this.userId).subscribe(data=>{
      this.wishListService.setWishListChange(true);
    })
  }
  onRemoveAllClick(){
    this.wishListService.deleteAll().subscribe(data=>{
      this.wishListService.setWishListChange(true);
    })
  }
}
