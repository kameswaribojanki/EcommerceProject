import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../models/ICategory';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categotyId:string="";
  categoryForm=new FormGroup({
    categoryName:new FormControl(''),
    type:new FormControl('Mens'),
    status:new FormControl(''),
    date:new FormControl(''),
    image:new FormControl('')
  })
  constructor(private categoryService:CategoryService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.categotyId=this.route.snapshot.params['id'];
    this.categoryService.getCategoryById(this.categotyId).subscribe(data=>{
      console.log(data);
      this.categoryForm.setValue({
        categoryName:data.categoryName,
        type:data.type,
        status:data.status,
        date:data.date,
        image:data.image
      })
    })
  }
  onEditCategory(){
    this.categoryService.editCategory(this.categoryForm.value as ICategory, this.categotyId).subscribe(data=>{
      this.categoryService.setCategoryChange(true);
      this.router.navigate(['dashboard/categories']);
    }) 
  }
  backToCategories(){
    this.router.navigate(['dashboard/categories']);
  }
}
