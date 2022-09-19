import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/categories/models/ICategory';
import { CategoryService } from 'src/app/categories/services/category.service';
import { ISubCategory } from '../../models/ISubCategory';
import { SubCategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.css']
})
export class EditSubcategoryComponent implements OnInit {
  categories:ICategory[]=[];
  subCategotyId:string="";
  subCategoryForm:FormGroup=new FormGroup({
    subCategoryName:new FormControl(''),
    categoryName:new FormControl(''),
    type:new FormControl(''),
    status:new FormControl(''),
    date:new FormControl(''),
    description:new FormControl(''),
  })
  constructor(private subCategoryService:SubCategoryService, private categoryService:CategoryService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    });
    let time=new Date();
    this.subCategoryForm.patchValue({
      date:time
    })
    this.subCategotyId=this.route.snapshot.params['id'];
    this.subCategoryService.getSubCategoryById(this.subCategotyId).subscribe(data=>{
      this.subCategoryForm.setValue({
          subCategoryName:data.subCategoryName,
          categoryName:data.categoryName,
          type:data.type,
          status:data.status,
          date:data.date,
          description:data.description,
      })
    })
  }
  onEditSubCategory(){
    this.subCategoryService.editSubCategory(this.subCategoryForm.value as ISubCategory, this.subCategotyId).subscribe(data=>{
      this.subCategoryService.setSubCategoryChange(true);
      this.router.navigate(['dashboard/subcategories']);
    })
  }
  backToSubCategories(){
    this.router.navigate(['dashboard/subcategories']);
  }
}
