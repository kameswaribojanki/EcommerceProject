import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../products/models/IProduct';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:IProduct[]=[];
  details!:IProduct[];
  // product!:IProduct;
  constructor(private route:ActivatedRoute, private productService:ProductService) { }
  id=this.route.snapshot.params['id'];
  ngOnInit(): void {
    // this.productService.getProductById(this.id).subscribe(data=>{
    //   this.product=data;
    // })
    let cartProductDetails=window.localStorage.getItem("cartDetails");
    if(cartProductDetails){
      this.details=JSON.parse(cartProductDetails)
      for(let i=0;i<this.details.length;i++){
        
        this.products.push(this.details[i])
      }
    }
  }
  onRemoveAllClick(){
    window.localStorage.removeItem("cartDetails");
  }

}
