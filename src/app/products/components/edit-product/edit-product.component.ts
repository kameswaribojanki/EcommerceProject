import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/categories/models/ICategory';
import { CategoryService } from 'src/app/categories/services/category.service';
import { ISubCategory } from 'src/app/subcategories/models/ISubCategory';
import { SubCategoryService } from 'src/app/subcategories/services/subcategory.service';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  categories:ICategory[]=[];
  subCategories:ISubCategory[]=[];
  productId:string="";
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
 subCategory:new FormControl("")
  })
  constructor(private route:ActivatedRoute, private productService:ProductService, private categoryService:CategoryService, private router:Router,private subCategoryService:SubCategoryService) { }

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
    this.productId=this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe(data=>{
      this.productForm.setValue({
        productName:data.productName,
        brand:data.brand,
        rating:data.rating,
        price:data.price,
        color:data.color,
        size:data.size,
        type:data.type,
        category:data.category,
        image:data.image,
        status:data.status,
        date:data.date,
        description:data.description,
        subCategory:data.subCategory
      })
    })
  }
  onCategoryChange(categoryId: string){
    this.subCategoryService.getSubCategories().subscribe((data: ISubCategory[])=>{
      this.subCategories = data.filter((p) => p.categoryName == categoryId);
    });
  }
  onEditProduct(){
    this.productService.editProduct(this.productForm.value as IProduct, this.productId).subscribe(data=>{
      this.productService.setProductChange(true);
      this.router.navigate(['dashboard/products']);
    })
  }
  backToProducts(){
    this.router.navigate(['dashboard/products']);
  }
}
