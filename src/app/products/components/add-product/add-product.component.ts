import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/categories/models/ICategory';
import { CategoryService } from 'src/app/categories/services/category.service';
import { ISubCategory } from 'src/app/subcategories/models/ISubCategory';
import { SubCategoryService } from 'src/app/subcategories/services/subcategory.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm:FormGroup=new FormGroup({
    productName:new FormControl(""),
    brand:new FormControl(""),
    rating:new FormControl(""),
    price:new FormControl(""),
    color:new FormControl(""),
    size:new FormControl(""),
    type:new FormControl(""),
    category:new FormControl(""),
    image:new FormControl(""),
    description:new FormControl(""),
    status:new FormControl(""),
    date:new FormControl(""),
    subCategory:new FormControl({value:"",disabled:true})
  })
  categories:ICategory[]=[];
  subCategories:ISubCategory[]=[];
  constructor(private productService:ProductService, private categoryService:CategoryService, private router:Router, private subCategoryService:SubCategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    });
    this.subCategoryService.getSubCategories().subscribe(data=>{
      this.subCategories=data;
    });
    let time=new Date();
    this.productForm.patchValue({
      date:time
    })
  }
  onCategoryChange(categoryId: string){
    this.subCategoryService.getSubCategories().subscribe((data: ISubCategory[])=>{
      this.subCategories = data.filter((p) => p.categoryName == categoryId);
    });
    this.productForm.enable();
  }
  onAddProduct(){
    let product=this.productForm.value;
    console.log(product);
    this.productService.addProduct(product).subscribe(product=>{
      this.productService.setProductChange(true);
      this.router.navigate(['dashboard/products']);
    })
  }
  backToProducts(){
    this.router.navigate(['dashboard/products']);
  }
}
