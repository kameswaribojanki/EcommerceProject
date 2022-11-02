import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "src/Guards/auth.guard";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { MyPaymentsComponent } from "./my-payments/my-payments.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { WishListComponent } from "./wish-list/wish-list.component";

const userProfileRoutes=[
    {path:"profile", component:UserProfileComponent, canActivate:[AuthGuard], children:[
        {path:"userDetails",component:UserDetailsComponent},
        {path:"",component:UserDetailsComponent},
        {path:"userOrders",component:MyOrdersComponent},
        {path:"userPayments", component:MyPaymentsComponent},
        {path:"userWishlist", component:WishListComponent}
      ]},
];
@NgModule({
    imports:[RouterModule.forChild(userProfileRoutes)],
    exports:[RouterModule],
})
export class UserProfileRoutingModule{

}