import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm:FormGroup=new FormGroup({
    categoryName:new FormControl('',[Validators.required]),
    type:new FormControl('',[Validators.required]),
    status:new FormControl(''),
    date:new FormControl(''),
    image:new FormControl('')
  })
  get categoryNameError(){
    let categoryNameMessage="";
    let categoryNameControl=this.categoryForm.get('categoryName');
    if(categoryNameControl?.touched){
      if(categoryNameControl?.errors?.['required']){
        categoryNameMessage="please enter category name";
      }
    }
    return categoryNameMessage;
  }
  get categoryTypeError(){
    let categoryTypeMessage="";
    let categoryTypeControl=this.categoryForm.get('type');
    if(categoryTypeControl?.touched){
      if(categoryTypeControl?.errors?.['required']){
        categoryTypeMessage="please enter category name";
      }
    }
    return categoryTypeMessage;
  }
  constructor(private categoryService:CategoryService, private router:Router) { }

  ngOnInit(): void {
    let time=new Date();
    this.categoryForm.patchValue({
      date:time
    })
  }
  onAddCategory(){
    let category=this.categoryForm.value;
    this.categoryService.addCategory(category).subscribe(category=>{
      this.categoryService.setCategoryChange(true);
     this.router.navigate(['dashboard/categories']);
    })
  }
  backToCategories(){
    this.router.navigate(['dashboard/categories']);
  }
}
