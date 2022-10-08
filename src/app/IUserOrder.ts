export interface IUserOrder{
    id?:string;
    userName:string;
    paymentType:string;
    dateOfOrder:Date;
    productName:string;
    image:string;
    totalAmount:number;
    address:string;
}