import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";
import { DashboardDataComponent } from "./Admin/components/dashboard-data/dashboard-data.component";
import { DashboardComponent } from "./Admin/components/dashboard/dashboard.component";
import { AllPaymentsComponent } from "./all-payments/all-payments.component";
import { CategoryModule } from "./category.module";
import { OrdersComponent } from "./orders/orders.component";
import { ProductModule } from "./product.module";
import { SubCategoryModule } from "./subCategory.module";
import { UsersComponent } from "./users/components/users/users.component";

@NgModule({
    declarations:[
        DashboardDataComponent,
        DashboardComponent,
        UsersComponent,
        OrdersComponent,
        AllPaymentsComponent
    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        CommonModule,
        CategoryModule,
        SubCategoryModule,
        ProductModule
    ],
})
export class AdminModule{

}