import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './products/models/IProduct';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {
  transform(value: any, filteredString: string) {
    if (value.length == 0 || filteredString == '') {
      return value;
    }
    let products: IProduct[] = [];
    products = value.filter((data: IProduct) => {
      return data.brand.toLowerCase() == filteredString.toLowerCase() || data.productName==filteredString.toLocaleLowerCase();
    });
    return products;
  }
}
