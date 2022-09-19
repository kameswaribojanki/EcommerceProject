import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/categories/services/category.service';
import { ISubCategory } from '../../models/ISubCategory';
import { SubCategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  subCategories:ISubCategory[]=[];
  constructor(private subCategoryService:SubCategoryService, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getSubCategories();
    this.subCategoryService.categoryChangeEvent.subscribe(data=>{
      this.getSubCategories();
    })
  }
  getSubCategories() {
    this.subCategories=[];
    this.categoryService.getCategories().subscribe(categories=>{
      this.subCategoryService.getSubCategories().subscribe(subCategories=>{
        for(let subCategory of subCategories){
          for(let category of categories){
            if(category.id===subCategory.categoryName){
              this.subCategories.push({...subCategory, categoryName:category.categoryName});
            }
          }
        }
      })
    })
  }
  onDeleteSubCategory(id:any){
    if(confirm("are you sure you want to delete category")){
      this.subCategoryService.deleteSubCategory(id).subscribe(data=>{
        this.getSubCategories();
      });
    }
    else{
      return;
    }
}

}
