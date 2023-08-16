import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class ItemCart {
  idItem: number;
  quantity: number;
  price: number;
  subtotal: number;

  product: any;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<ItemCart[]>(null);
  public currentDataCart$ = this.cart.asObservable();
  public qtyItems = new Subject<number>();

  constructor() {
    this.cart = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('orden'))
    );
    this.currentDataCart$ = this.cart.asObservable();
  }

  saveCart(): void {
    localStorage.setItem('orden', JSON.stringify(this.cart.getValue()));
    // console.log(this.cart.getValue())
  }

  addToCart(producto: any) {
    producto.images = null;

    // console.log(producto)
    // if(producto.quantity > producto.product.quantity){
    //   return;
    // }

    const newItem = new ItemCart();
    newItem.idItem = producto.id | producto.idItem;
    newItem.price = producto.price;
    newItem.quantity = 1;
    newItem.subtotal = this.calculoSubtotal(newItem);
    newItem.product = producto;
    let listCart = this.cart.getValue();
    if (listCart) {
      let objIndex = listCart.findIndex((obj) => obj.idItem == newItem.idItem);
      if (objIndex != -1) {
        if (producto.hasOwnProperty('quantity')) {
          if (producto.quantity <= 0) {
            this.removeFromCart(newItem);
            return;
          } else {
            listCart[objIndex].quantity = producto.quantity;
          }
        } else {
          listCart[objIndex].quantity += 1;
        }
        newItem.quantity = listCart[objIndex].quantity;
        listCart[objIndex].subtotal = this.calculoSubtotal(newItem);
      }
      else {
        listCart.push(newItem);
      }
    }
    else {
      listCart = [];
      listCart.push(newItem);
    }
    this.cart.next(listCart);
    this.qtyItems.next(this.quantityItems());
    this.saveCart();
  }

  private calculoSubtotal(item: ItemCart) {
    return item.price * item.quantity;
  }

  public removeFromCart(newData: ItemCart) {
    let listCart = this.cart.getValue();
    let objIndex = listCart.findIndex((obj) => obj.idItem == newData.idItem);
    if (objIndex != -1) {
      listCart.splice(objIndex, 1);
    }
    this.cart.next(listCart);
    this.qtyItems.next(this.quantityItems());
    this.saveCart();
  }

  get getItems() {
    return this.cart.getValue();
  }

  get countItems(): Observable<number> {
    this.qtyItems.next(this.quantityItems());
    return this.qtyItems.asObservable();
  }

  setItems() {
    return this.cart.getValue();
  }

  quantityItems() {
    let listCart = this.cart.getValue();
    let sum = 0;
    if (listCart != null) {
      listCart.forEach((obj) => {
        sum += obj.quantity;
      });
    }
    return sum;
  }

  public getTotal(): number {
    let total = 0;
    let listCart = this.cart.getValue();
    if (listCart != null) {

      listCart.forEach((item: ItemCart, index) => {
        total += item.subtotal;
      });
    }

    return total;
  }

  public isInCart(itemId:number) {
    let listCart = this.cart.getValue();
    if (listCart != null) {
      let objIndex = listCart.findIndex((obj) => obj.idItem == itemId);
      if (objIndex != -1) {
        return true;
      }
    }
    return false;
  }

  public deleteCart() {
    this.cart.next(null);
    this.qtyItems.next(0);
    this.saveCart();
  }
}
