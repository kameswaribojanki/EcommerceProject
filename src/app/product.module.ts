import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AddProductComponent } from "./products/components/add-product/add-product.component";
import { EditProductComponent } from "./products/components/edit-product/edit-product.component";
import { ProductsComponent } from "./products/components/products/products.component";

@NgModule({
    declarations:[
        ProductsComponent,
        AddProductComponent,
        EditProductComponent,
    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule
    ],
})
export class ProductModule{

}