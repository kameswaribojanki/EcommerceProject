import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ParticularProductComponent } from './particular-product/particular-product.component';
import { ParticularCategoryComponent } from './particular-category/particular-category.component';
import { PaymentsComponent } from './payments/payments.component';
import { AdminModule } from './admin.module';
import { UserProfileModule } from './user-profile.module';
import { AuthModule } from './auth.module';
import { FilterModule } from './filter.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ParticularProductComponent,
    ParticularCategoryComponent,
    PaymentsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlickCarouselModule,
    FilterModule,
    FormsModule,
    AuthModule,
    AdminModule,
    UserProfileModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
