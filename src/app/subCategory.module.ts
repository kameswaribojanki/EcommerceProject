import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AddSubcategoryComponent } from "./subcategories/components/add-subcategory/add-subcategory.component";
import { EditSubcategoryComponent } from "./subcategories/components/edit-subcategory/edit-subcategory.component";
import { SubcategoriesComponent } from "./subcategories/components/subcategories/subcategories.component";

@NgModule({
    declarations:[
        SubcategoriesComponent,
        AddSubcategoryComponent,
        EditSubcategoryComponent,
    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule
    ],
})
export class SubCategoryModule{

}