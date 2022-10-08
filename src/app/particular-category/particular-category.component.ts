import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../Auth/models/IUser';
import { ICategory } from '../categories/models/ICategory';
import { CategoryService } from '../categories/services/category.service';
import { IProduct } from '../products/models/IProduct';
import { ProductService } from '../products/services/product.service';
import { SearchService } from '../search.service';
import { ISubCategory } from '../subcategories/models/ISubCategory';
import { SubCategoryService } from '../subcategories/services/subcategory.service';
import { WishListService } from '../wishList.service';

@Component({
  selector: 'app-particular-category',
  templateUrl: './particular-category.component.html',
  styleUrls: ['./particular-category.component.css']
})
export class ParticularCategoryComponent implements OnInit {
  heartColor='green';
  categories:ICategory[]=[];
  products:IProduct[]=[];
  wishList:IProduct[]=[];
  showAll:boolean=false;
  filteredProducts:IProduct[]=[];
  selectedCategoryId='';
  selectedSubCategoryId='';
  selectedBrandId='';
  subCategories:ISubCategory[]=[];
  searchText:string="";
  userId:string='';
  constructor(private categoryService:CategoryService,private router:Router, private route:ActivatedRoute, private subCategoryService:SubCategoryService, private productService:ProductService, private searchService:SearchService, private wishListService:WishListService) { }
  id=this.route.snapshot.params['id'];
  categoryName:string="";
  ngOnInit(): void {
    this.searchService.searchProduct.subscribe((data:string)=>{
      this.searchText=data;
    })
    this.categoryService.getCategories().subscribe(categories=>{
      for(let i=0;i<categories.length;i++){
        if(categories[i].id==this.id){
          this.categoryName=categories[i].categoryName;
        }
      }
    })

    this.productService.getProducts().subscribe(data=>{  
      this.products=data;
      this.filteredProducts=data.filter((p)=>{return p.category==this.id})
    })
    this.subCategoryService.getSubCategories().subscribe(data=>{
      this.subCategories=data;
    })
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
    
  }
  showAllProducts(){
    this.productService.getProducts().subscribe(data=>{
      this.products=data;
      this.filteredProducts=data;
    })
  }
  onCategoryChange(event:Event,categoryId: string){
    this.selectedCategoryId=(event.target as HTMLSelectElement).value;
    console.log(this.selectedCategoryId);
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
  onLikeClicked(id:any){
    // if(id==this.id){
    //   this.heartColor='red';
    // }
    // this.heartColor='red';
    let userDetailsJSON=localStorage.getItem("userDetails");
    let userDetails!: IUser;
    if (userDetailsJSON) userDetails = JSON.parse(userDetailsJSON);
    this.userId = userDetails.userId;
    this.productService.getProductById(id).subscribe(data=>{
      this.wishListService.addWishList(data,this.userId).subscribe(data=>{

      })
    })
  }
}
