import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../Auth/models/IUser';
import { CartService } from '../cart.service';
import { ICart } from '../ICart';
import { IProduct } from '../products/models/IProduct';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-particular-product',
  templateUrl: './particular-product.component.html',
  styleUrls: ['./particular-product.component.css']
})
export class ParticularProductComponent implements OnInit {
  product!:IProduct;
  starCount:number[]=[];
  constructor(private productService:ProductService, private route:ActivatedRoute, private router:Router, private cartService:CartService) { }
  id=this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.productService.getProductById(this.id).subscribe(data=>{
      this.product=data;
      for(let i=0;i<Number(data.rating);i++){
        this.starCount.push(i);
      }
    })
  }
  addToCart(){
    let cart:ICart={
      productId:this.id,
      name:this.product.productName,
      price:this.product.price,
      brand:this.product.brand,
      quantity:this.product.quantity,
      description:this.product.description,
      image:this.product.image
    }
    // this.productService.getProductById(this.id).subscribe(data=>{
    //   this.product=data;
    // })
    let userDetailsJSON=localStorage.getItem("userDetails");
    let userDetails!: IUser;
    if (userDetailsJSON) userDetails = JSON.parse(userDetailsJSON);
    this.cartService.addProductToCart(cart,userDetails.userId).subscribe(product=>{
    })
    console.log(cart);
  }
  onBuyNowClicked(){
    this.router.navigate(['payments']);
  }
}
