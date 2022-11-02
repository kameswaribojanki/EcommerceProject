import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../Auth/models/IUser';
import { AuthService } from '../Auth/services/auth.service';
import { CartService } from '../cart.service';
import { ICart } from '../ICart';
import { IProduct } from '../products/models/IProduct';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:IProduct[]=[];
  cartDetails!:ICart[];
  grandTotal:number=0;
  userId:string='';
  productId:string="";
  constructor(private route:ActivatedRoute, private productService:ProductService,private cartService:CartService, private authService:AuthService, private router:Router) { }
  id=this.route.snapshot.params['id'];
  ngOnInit(): void {
    let userDetailsJSON=localStorage.getItem("userDetails");
    let userDetails!: IUser;
    if (userDetailsJSON) userDetails = JSON.parse(userDetailsJSON);
    this.userId = userDetails.userId;
    this.cartService.productChangeEvent.subscribe(data=>{
      this.cartService.getProducts(this.userId).subscribe(data=>{
        this.cartDetails=data;
      })
    })
    this.cartService.getProducts(this.userId).subscribe(data=>{
      this.cartDetails=data;
      for(let i=0;i<data.length;i++){
        this.grandTotal+=Number(data[i].quantity)*Number(data[i].price);
      }
    })
  }
  onRemoveAllClick(){
    if(confirm("are you sure to delete all products from cart")){
      this.cartService.deleteAll().subscribe(data=>{
        this.cartService.setProductChange(true);
      })
    }
  }
  deleteFromCart(product:any){
    if(confirm("are you sure to delete product from cart")){
      this.cartService.deleteProduct(product,this.userId).subscribe(data=>{
        this.cartService.setProductChange(true);
      })
    }
  }
  incrementCount(product: ICart) {
    if(product.quantity!=10){
      product.quantity=product.quantity+1;
      this.cartService.editProduct(product,product.id,this.userId).subscribe(data=>{
      })
    }
  }
  decrementCount(product: ICart) {
    if(product.quantity!=1){
      product.quantity=product.quantity-1;
      this.cartService.editProduct(product,product.id,this.userId).subscribe(data=>{
      })
    }
  }
  getGrandTotal(carts: ICart[]) {
    let grandTotal = 0;
    carts.forEach((product) => {
      let total = product.quantity * product.price;
      grandTotal += total;
    });
    return grandTotal;
  }
  onPlaceOrderClicked(){
    this.router.navigate(['payments',this.productId]);
  }
  onCartImageClick(id:any){
    this.router.navigate([id,"product"])
  }
}
