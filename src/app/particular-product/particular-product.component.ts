import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../products/models/IProduct';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-particular-product',
  templateUrl: './particular-product.component.html',
  styleUrls: ['./particular-product.component.css']
})
export class ParticularProductComponent implements OnInit {
  product!:IProduct;
  count=0;
  // i=0;
  constructor(private productService:ProductService, private route:ActivatedRoute, private router:Router) { }
  id=this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.productService.getProductById(this.id).subscribe(data=>{
      this.product=data;
    })
  }
  addToCart(){
    this.productService.products.push(this.product);
    let products=JSON.stringify(this.productService.products);
    window.localStorage.setItem("cartDetails",products);
  }
}
