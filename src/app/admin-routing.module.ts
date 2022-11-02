import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/Guards/auth.guard";
import { DashboardDataComponent } from "./Admin/components/dashboard-data/dashboard-data.component";
import { DashboardComponent } from "./Admin/components/dashboard/dashboard.component";
import { AllPaymentsComponent } from "./all-payments/all-payments.component";
import { AddCategoryComponent } from "./categories/components/add-category/add-category.component";
import { CategoriesComponent } from "./categories/components/categories/categories.component";
import { EditCategoryComponent } from "./categories/components/edit-category/edit-category.component";
import { OrdersComponent } from "./orders/orders.component";
import { AddProductComponent } from "./products/components/add-product/add-product.component";
import { EditProductComponent } from "./products/components/edit-product/edit-product.component";
import { ProductsComponent } from "./products/components/products/products.component";
import { AddSubcategoryComponent } from "./subcategories/components/add-subcategory/add-subcategory.component";
import { EditSubcategoryComponent } from "./subcategories/components/edit-subcategory/edit-subcategory.component";
import { SubcategoriesComponent } from "./subcategories/components/subcategories/subcategories.component";
import { UsersComponent } from "./users/components/users/users.component";
const adminRoutes:Routes=[
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard], children:
  [
    {path:"dashboardData",component:DashboardDataComponent},
    {path:"",component:DashboardDataComponent}, 
    {path:"categories",component:CategoriesComponent,children:
    [
      {path:"add", component:AddCategoryComponent},
      {path:":id/edit", component:EditCategoryComponent}
    ]
    },
    {path:"products", component:ProductsComponent,  children:
    [
      {path:"add", component:AddProductComponent},
      {path:":id/edit", component:EditProductComponent}
    ]
    },
    {path:"subcategories", component:SubcategoriesComponent,children:
    [
      {path:"add", component:AddSubcategoryComponent},
      {path:":id/edit", component:EditSubcategoryComponent}
    ]
    },
    {path:"users", component:UsersComponent},
    {path:"orders", component:OrdersComponent},
    {path:"payments", component:AllPaymentsComponent}
  ]
  },
];
@NgModule({
    imports:[RouterModule.forChild(adminRoutes)],
    exports:[RouterModule]
})
export class AdminRoutingModule{

}