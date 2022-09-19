import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/categories/models/ICategory';
import { CategoryService } from 'src/app/categories/services/category.service';
import { SubCategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {
  categories:ICategory[]=[];
  subCategoryForm:FormGroup=new FormGroup({
    subCategoryName:new FormControl(''),
    categoryName:new FormControl(''),
    type:new FormControl(''),
    status:new FormControl(''),
    date:new FormControl(''),
    description:new FormControl(''),
  })
  constructor(private subCategoryService:SubCategoryService, private categoryService:CategoryService, private router:Router) { }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    });
    let time=new Date();
    this.subCategoryForm.patchValue({
      date:time
    })
  }
  onAddSubCategory(){
    let subCategory=this.subCategoryForm.value;
    this.subCategoryService.addSubCategory(subCategory).subscribe(category=>{
      this.subCategoryService.setSubCategoryChange(true);
     this.router.navigate(['dashboard/subcategories']);
     console.log(subCategory);
    })
  }
  backToSubCategories(){
    this.router.navigate(['dashboard/subcategories']);
  }
}
