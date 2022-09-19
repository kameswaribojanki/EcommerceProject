import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/categories/services/category.service';
import { ProductService } from 'src/app/products/services/product.service';

@Component({
  selector: 'app-dashboard-data',
  templateUrl: './dashboard-data.component.html',
  styleUrls: ['./dashboard-data.component.css']
})
export class DashboardDataComponent implements OnInit {
  pcount=0;
  ccount=0;
  constructor(private productService:ProductService, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        this.pcount++
      }
    })
    this.categoryService.getCategories().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        this.ccount++
      }
    })
  }

}
