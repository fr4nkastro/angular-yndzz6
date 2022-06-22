import { Injectable } from '@angular/core';
import { Product} from './products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  constructor(private http: HttpClient) { }

  
  public addToCart(product: Product) {
    this.items.push(product);
    
  }

  public getItems() {
    return this.items;
  }

  public clearCart() {
    this.items = [];
    return this.items;
  }

  public getShippingPrices(){
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json')
  }
}
