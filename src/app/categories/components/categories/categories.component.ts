import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/ICategory';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:ICategory[]=[];
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
    this.categoryService.categoryChangeEvent.subscribe(data=>{
      this.getCategories();
    })
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
  }
  onDeleteCategory(id:any){
      if(confirm("are you sure you want to delete category")){
        this.categoryService.deleteCategory(id).subscribe(data=>{
          this.getCategories();
        });
      }
      else{
        return;
      }
  }
}
