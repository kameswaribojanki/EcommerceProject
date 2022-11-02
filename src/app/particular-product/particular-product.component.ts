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
  isDisabled:boolean=true;
  isSizeError:boolean=true;
  size:string="";
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
    let userDetailsJSON=localStorage.getItem("userDetails");
    let userDetails!: IUser;
    if (userDetailsJSON) userDetails = JSON.parse(userDetailsJSON);
    let cart:ICart={
      productId:this.id,
      name:this.product.productName,
      price:this.product.price,
      brand:this.product.brand,
      size:this.size,
      quantity:this.product.quantity,
      description:this.product.description,
      image:this.product.image
    }

    this.cartService.getProducts(userDetails.userId).subscribe(data=>{
      if(data.length==0){
        this.cartService.addProductToCart(cart,userDetails.userId).subscribe(product=>{
        })
      }
      else{
         const a =  data.filter(data=>{return data.productId==cart.productId})
         if(a.length!=0)
         {
          const b=a.filter(data=>{return data.size==cart.size})
          if(b.length!=0){
            this.cartService.getProductById(b[0].id, userDetails.userId).subscribe(data=>{
              let updatedCart:ICart={
                productId:this.id,
                name:data.name,
                price:data.price,
                brand:data.brand,
                size:this.size,
                quantity:data.quantity+1,
                description:data.description,
                image:data.image
              }
              this.cartService.editProduct(updatedCart,b[0].id,userDetails.userId).subscribe(data=>{
              })
            })
          }
          else{
            this.cartService.addProductToCart(cart,userDetails.userId).subscribe(product=>{
            })
          }
         }
         else
         {
          this.cartService.addProductToCart(cart,userDetails.userId).subscribe(product=>{
          })
         }
      }
    }) 
  }
  onBuyNowClicked(){
    this.addToCart();
    this.router.navigate(['payments',this.id]);
  }
  onSizeChange(event:any){
    this.size=event.target.value;
    this.isDisabled=false;
    this.isSizeError=false;
  }
}
