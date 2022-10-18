import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './Admin/components/dashboard/dashboard.component';
import { AddCategoryComponent } from './categories/components/add-category/add-category.component';
import { EditCategoryComponent } from './categories/components/edit-category/edit-category.component';
import { CategoriesComponent } from './categories/components/categories/categories.component';
import { DashboardDataComponent } from './Admin/components/dashboard-data/dashboard-data.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/components/products/products.component';
import { AddProductComponent } from './products/components/add-product/add-product.component';
import { EditProductComponent } from './products/components/edit-product/edit-product.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegisterComponent } from './Auth/components/register/register.component';
import { SubcategoriesComponent } from './subcategories/components/subcategories/subcategories.component';
import { AddSubcategoryComponent } from './subcategories/components/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './subcategories/components/edit-subcategory/edit-subcategory.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ParticularProductComponent } from './particular-product/particular-product.component';
import { ParticularCategoryComponent } from './particular-category/particular-category.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { CartComponent } from './cart/cart.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { UsersComponent } from './users/components/users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { PaymentsComponent } from './payments/payments.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrdersComponent } from './orders/orders.component';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { AllPaymentsComponent } from './all-payments/all-payments.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    DashboardComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CategoriesComponent,
    DashboardDataComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    LoginComponent,
    RegisterComponent,
    SubcategoriesComponent,
    AddSubcategoryComponent,
    EditSubcategoryComponent,
    ParticularProductComponent,
    ParticularCategoryComponent,
    FilterPipe,
    CartComponent,
    SearchPipePipe,
    UsersComponent,
    UserProfileComponent,
    UserDetailsComponent,
    WishListComponent,
    PaymentsComponent,
    MyOrdersComponent,
    OrdersComponent,
    MyPaymentsComponent,
    AllPaymentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlickCarouselModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
