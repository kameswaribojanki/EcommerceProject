import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AddCategoryComponent } from "./categories/components/add-category/add-category.component";
import { CategoriesComponent } from "./categories/components/categories/categories.component";
import { EditCategoryComponent } from "./categories/components/edit-category/edit-category.component";

@NgModule({
    declarations:[
        AddCategoryComponent,
        EditCategoryComponent,
        CategoriesComponent
    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule
    ],
})
export class CategoryModule{

}