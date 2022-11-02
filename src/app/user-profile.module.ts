import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CartComponent } from "./cart/cart.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { MyPaymentsComponent } from "./my-payments/my-payments.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { WishListComponent } from "./wish-list/wish-list.component";

@NgModule({
    declarations:[
        UserProfileComponent,
        UserDetailsComponent,
        WishListComponent,
        MyOrdersComponent,
        MyPaymentsComponent,
        CartComponent
    ],
    imports:[
        UserProfileRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
})
export class UserProfileModule{

}