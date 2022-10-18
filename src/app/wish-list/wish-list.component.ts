import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private wishListService:WishListService, private router:Router) { }

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
  deleteFromWishList(id:any){
    if(confirm("are you sure to delete product from wishlist")){
      this.wishListService.deleteWishList(id,this.userId).subscribe(data=>{
        this.wishListService.setWishListChange(true);
      })
    }
  }
  onRemoveAllClick(){
    if(confirm("are you sure to delete all products from wishlist")){
      this.wishListService.deleteAll().subscribe(data=>{
        this.wishListService.setWishListChange(true);
      })
    }
  }
  onWishListImageClicked(id:any){
    this.router.navigate([id,"product"])
  }
}
