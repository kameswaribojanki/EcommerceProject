import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '../categories/models/ICategory';
import { CategoryService } from '../categories/services/category.service';
import { IProduct } from '../products/models/IProduct';
import { ProductService } from '../products/services/product.service';
import { SearchService } from '../search.service';
import { SubCategoryService } from '../subcategories/services/subcategory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private productService:ProductService, private router:Router, private categoryService:CategoryService, private searchService:SearchService, private subCategoryService:SubCategoryService) { }
  products:IProduct[]=[];
  mensProducts:IProduct[]=[];
  womensProducts:IProduct[]=[];
  kidsProducts:IProduct[]=[];
  categories:ICategory[]=[];
  searchText:string="";
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>{
      this.products=data;
      this.mensProducts=data.filter(f=>f.type==="Mens");
      this.womensProducts=data.filter(f=>f.type==="Womens");
      this.kidsProducts=data.filter(f=>f.type==="Kids");
    })
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
    this.searchService.searchProduct.subscribe((data:string)=>{
      this.searchText=data;
    })
  }
  onProductImageClicked(id:any){
    this.router.navigate([id,"product"]);
  }
  onCategoryImageClicked(id:any){
    this.router.navigate([id,"category"]);
  }
  slideConfig = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
}
