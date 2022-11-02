import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/Guards/auth.guard';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegisterComponent } from './Auth/components/register/register.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ParticularCategoryComponent } from './particular-category/particular-category.component';
import { ParticularProductComponent } from './particular-product/particular-product.component';
import { PaymentsComponent } from './payments/payments.component';
const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:":id/product", component:ParticularProductComponent},
  {path:":id/category", component:ParticularCategoryComponent},
  {path:"cart", component:CartComponent, canActivate:[AuthGuard]},
  {path:"payments/:productId", component:PaymentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
