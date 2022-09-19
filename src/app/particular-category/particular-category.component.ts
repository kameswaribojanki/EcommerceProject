import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../categories/models/ICategory';
import { CategoryService } from '../categories/services/category.service';
import { IProduct } from '../products/models/IProduct';
import { ProductService } from '../products/services/product.service';
import { ISubCategory } from '../subcategories/models/ISubCategory';
import { SubCategoryService } from '../subcategories/services/subcategory.service';

@Component({
  selector: 'app-particular-category',
  templateUrl: './particular-category.component.html',
  styleUrls: ['./particular-category.component.css']
})
export class ParticularCategoryComponent implements OnInit {
  category!:ICategory;
  subCategories:ISubCategory[]=[];
  subCategoryName:string[]=[];
  subCategoryId:string[]=[];
  arrowClick:boolean=false;
  products:IProduct[]=[];
  constructor(private categoryService:CategoryService, private route:ActivatedRoute, private subCategoryService:SubCategoryService, private productService:ProductService) { }
  id=this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>{
      this.products=data;
    })
    this.categoryService.getCategoryById(this.id).subscribe(data=>{
      this.category=data;
      this.subCategoryService.getSubCategories().subscribe(data=>{
        this.subCategories=data;
        for(let i=0;i<data.length;i++){
          if(this.id===data[i].categoryName){
            //console.log(data[i].subCategoryName);
            this.subCategoryName.push(data[i].subCategoryName);
          }
        }
      })
    })
  }
  onArrowClick(){
    this.arrowClick=!this.arrowClick;
    
      for(let i=0;i<this.products.length;i++){
        for(let j=0;j<this.subCategoryId.length;j++){
          console.log("HELLO")
          if(this.products[i].subCategory===this.subCategoryId[j]){

            console.log(this.products[i].subCategory);
          }
        }
      }
    
  }
  
}
