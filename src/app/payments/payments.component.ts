import { Component, OnInit } from '@angular/core';
import { IUserDetails } from '../users/models/IUser';
import { IUser } from '../Auth/models/IUser';
import { UserService } from '../users/services/user.service';
import { CartService } from '../cart.service';
import { ICart } from '../ICart';
import { IUserPayment } from '../IUserPayment';
import { PaymentService } from '../payment.service';
import { IUserOrder } from '../IUserOrder';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  selectedType:string="";
  users:IUserDetails[]=[];
  cartDetails:ICart[]=[];
  phoneNumber:string="";
  // grandTotal:number=0;
  userId:string='';
  paymentDetails:IUserPayment[]=[];
  address:string='';
  showDisabledStatus:boolean=true;
  value:boolean=true;
  productId:string="";
  constructor(private userService:UserService, private cartService:CartService, private paymentService:PaymentService, private orerService:OrderService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.productId=this.route.snapshot.params['productId'];
    console.log(this.productId);
    let userDetailsJSON=localStorage.getItem("userDetails");
    let userDetails!: IUser;
    if (userDetailsJSON) userDetails = JSON.parse(userDetailsJSON);
    this.userId = userDetails.userId;
    this.userService.getUsers().subscribe(data=>{
      this.users=data;
      data.filter(p=>{if(p.userId==userDetails.userId){this.phoneNumber=p.phone}})
    })
    this.cartService.getProducts(this.userId).subscribe(data=>{
      this.cartDetails=data;
    })
    // this.cartService.getProducts(this.userId).subscribe(data=>{
    //   this.cartDetails=data;
    //   for(let i=0;i<data.length;i++){
    //     this.grandTotal+=Number(data[i].quantity)*Number(data[i].price);
    //   }
    // })
    if(this.productId){
      this.cartService.getProducts(this.userId).subscribe(data=>{
        this.cartDetails=data.filter((p)=>{return p.productId===this.productId});
      })
    }
  }
  onPaymentModeChange(event:any){
    let selectedValue=event.target.value;
    this.selectedType=selectedValue;
    if(selectedValue){
      this.showDisabledStatus=false;
    }
  }
  onSubPaymentModeChange(event:any){
    let selectedValue=event.target.value;
    this.selectedType=selectedValue;
    if(this.selectedType=='')
    this.value=false;
  }
  incrementCount(product: ICart) {
    if(product.quantity!=10){
      product.quantity=product.quantity+1;
      this.cartService.editProduct(product,product.id,this.userId).subscribe(data=>{
      })
    }
  }
  decrementCount(product: ICart) {
    if(product.quantity!=1){
      product.quantity=product.quantity-1;
      this.cartService.editProduct(product,product.id,this.userId).subscribe(data=>{
      })
    }
  }
  getGrandTotal(carts: ICart[]) {
    let grandTotal = 0;
    carts.forEach((product) => {
      let total = product.quantity * product.price;
      grandTotal += total;
    });
    return grandTotal;
  }
  deleteFromCart(product:any){
    this.cartService.deleteProduct(product,this.userId).subscribe(data=>{
      this.cartService.setProductChange(true);
    })
  }
  onPayTotalAmount(){
    let payment:IUserPayment={
      paymentType:this.selectedType,
      dateOfPayment:new Date(),
      amount:this.getGrandTotal(this.cartDetails)+(this.cartDetails.length*10)
    }
    this.paymentService.addPaymentDetails(payment, this.userId).subscribe(data=>{

    })
    for(let cart of this.cartDetails){
      let order:IUserOrder={
        image:cart.image,
        userName:this.userId,
        paymentType:this.selectedType,
        dateOfOrder: new Date(),
        productName:cart.name,
        totalAmount:cart.price,
        address:this.address
      }
      this.orerService.addOrderDetails(order, this.userId).subscribe(data=>{

      })
    }
    this.cartService.deleteAll().subscribe(data=>{
      
    })
  }
}
