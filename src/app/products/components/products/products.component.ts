import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/categories/services/category.service';
import { SubCategoryService } from 'src/app/subcategories/services/subcategory.service';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:IProduct[]=[];
  constructor(private productService:ProductService, private categoryService:CategoryService, private subCategoryService:SubCategoryService) { }

  ngOnInit(): void {
    this.getProducts();
    this.productService.productChangeEvent.subscribe(data=>{
      this.getProducts();
    })
  }
  getProducts() {
    this.products=[];
    // this.categoryService.getCategories().subscribe(categories=>{
    //   this.productService.getProducts().subscribe(products=>{
    //     this.subCategoryService.getSubCategories().subscribe(subCategories=>{
    //       for(let product of products){
    //         for(let category of categories){
    //           for(let subCategory of subCategories){
    //             if(category.id===product.category){
    //               this.products.push({...product, category:category.categoryName});
    //             }
    //             if(subCategory.id===product.subCategory){
    //               this.products.push({...product, subCategory:subCategory.subCategoryName});
    //             }
    //           }
    //         }
    //       }
    //     })
    //   })
    // })

    this.categoryService.getCategories().subscribe(categories=>{
      this.subCategoryService.getSubCategories().subscribe(subCategories=>{
        this.productService.getProducts().subscribe(products=>{
          for(let product of products){
            let category=categories.find(category=>category.id==product.category
            );
            let subCategory=subCategories.find(subCategory=>subCategory.id==product.subCategory
            );
            this.products.push({...product, subCategory:subCategory?.subCategoryName ?? '', category:category?.categoryName ?? ''});
          }
        })
      })
    })


  }
  onDeleteProduct(id:any){
      if(confirm("are you sure you want to delete category")){
        this.productService.deleteProduct(id).subscribe(data=>{
          this.getProducts();
        });
      }
      else{
        return;
      }
  }
}
