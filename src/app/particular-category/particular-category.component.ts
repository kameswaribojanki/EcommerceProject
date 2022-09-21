import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  categories:ICategory[]=[];
  products:IProduct[]=[];
  showAll:boolean=false;
  filteredProducts:IProduct[]=[];
  selectedCategoryId='';
  selectedSubCategoryId='';
  selectedBrandId='';
  subCategories:ISubCategory[]=[];
  
  constructor(private categoryService:CategoryService,private router:Router, private route:ActivatedRoute, private subCategoryService:SubCategoryService, private productService:ProductService) { }
  id=this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.subCategoryService.getSubCategories().subscribe(data=>{
      this.subCategories=data;
    })
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
    this.productService.getProducts().subscribe(data=>{
      this.products=data;
      this.filteredProducts=data;
    })
  }
  showAllProducts(){
    this.filteredProducts=this.products;
  }
  onCategoryChange(event:Event,categoryId: string){
    this.selectedCategoryId=(event.target as HTMLSelectElement).value;
    this.productService.getProducts().subscribe(data=>{
      this.filteredProducts=data.filter((p)=>{return p.category==this.selectedCategoryId})
    })
    this.subCategoryService.getSubCategories().subscribe((data: ISubCategory[])=>{
      this.subCategories = data.filter((p) => p.categoryName == categoryId);
    });
  }
  onSubCategoryChange(event:Event){
    this.selectedSubCategoryId=(event.target as HTMLSelectElement).value;
    this.productService.getProducts().subscribe(data=>{
      this.filteredProducts=data.filter((p)=>{return p.subCategory==this.selectedSubCategoryId})
    })
  }
  onBrandChange(event:Event){
    this.selectedBrandId=(event.target as HTMLSelectElement).value;
    this.productService.getProducts().subscribe(data=>{
      this.filteredProducts=data.filter((p)=>{return p.brand==this.selectedBrandId})
    })
  }
  onMensClick(){
    this.productService.getProducts().subscribe(data=>{
      this.filteredProducts=data.filter((p)=>{return p.type=="Mens"})
    })
  }
  onWomensClick(){
    this.productService.getProducts().subscribe(data=>{
      this.filteredProducts=data.filter((p)=>{return p.type=="Womens"})
    })
  }
  onKidsClick(){
    this.productService.getProducts().subscribe(data=>{
      this.filteredProducts=data.filter((p)=>{return p.type=="Kids"})
    })
  }
  onProductImageClicked(id:any){
    this.router.navigate([id,"product"]);
  }
}
