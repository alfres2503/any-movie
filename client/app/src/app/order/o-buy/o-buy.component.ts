import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificationService,
  MessageType,
} from 'src/app/share/notification.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-o-buy',
  templateUrl: './o-buy.component.html',
  styleUrls: ['./o-buy.component.css'],
})
export class OBuyComponent {
  total = 0;
  date = Date.now();
  qtyItems = 0;
  //Tabla
  displayedColumns: string[] = [
    'product',
    'price',
    'quantity',
    'subtotal',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  userInfo: any;
  isAuth: boolean;
  idUser: number;
  destroy$: Subject<boolean> = new Subject<boolean>();

  address: any;
  payment_method: any;

  orderForm: FormGroup;

  constructor(
    private cartService: CartService,
    private noti: NotificationService,
    private formBuilder: FormBuilder,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuth = valor)
    );

    this.idUser = this.authService.idUser;

    if (this.idUser != undefined) {
      this.gService
        .get('users', this.idUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe((apiData: any) => {
          this.userInfo = apiData;
          console.log(this.userInfo);
        });
    }
    this.reactiveForm();
  }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.cartService.getTotal();
  }

  reactiveForm() {
    this.orderForm = this.formBuilder.group({
      address: [null, Validators.required],
      payment_method: [null, Validators.required],
    });
  }

  // ----- CART
  updateQuantity(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
  }
  deleteItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.message('Order', 'Deleted Product', MessageType.warning);
  }

  registerOrder() {
    if (this.cartService.getItems != null && this.orderForm.value.payment_method!=null && this.orderForm.value.address!=null ) {
      let cart_item = this.cartService.getItems;
      
      let products = cart_item.map((x) => ({
        // detail
        //   id_product  Int
        //   quantity    Int
        //   subtotal    Decimal
        ['id_product']: x.idItem,
        ['quantity']: x.quantity,
        ['subtotal']: x.subtotal,
      }));
      
      let order_info = {
        // header
        //   id_user           Int
        //   id_payment_method Int
        //   id_address        Int
        //   total             Decimal
        //   created_at        DateTime
        //   payed             Boolean
        id_user: this.idUser,
        id_payment_method:this.orderForm.value.payment_method,
        id_address:this.orderForm.value.address,
        total: this.total,
        payed:true,
        details: products,
      };

      this.gService.create('transactions', order_info).subscribe((answer: any) => {
        this.noti.message(
          'Order',
          'Orden registered #' + answer.id,
          MessageType.success
        );
        this.cartService.deleteCart();
        this.total = this.cartService.getTotal();
        console.log(answer);
      });
    } else {
      this.noti.message('Order', 'Add a product to buy', MessageType.warning);
    }
  }
}

// header
//   id                Int      @id @default(autoincrement())     se manda hidden
//   id_user           Int                                        se manda con el que está loggeado
//   id_payment_method Int                                        sale en el html si tiene registrados y si no tiene, sale boton
//   id_address        Int                                        sale en el html si tiene registrados y si no tiene, sale boton
//   total             Decimal                                    se manda del ts
//   created_at        DateTime                                   datetime.now
//   payed             Boolean                                    se manda siempre falso

// detail
//   id          Int       @id @default(autoincrement())          se manda hidden
//   id_header   Int                                              se manda hidden
//   id_product  Int                                              de la lista del cart
//   quantity    Int                                              de la lista del cart
//   subtotal    Decimal                                          de la lista del cart
//   arrivalDate DateTime?                                        cuando el cliente lo marca como entregado

// created_at
// : 
// Mon Aug 14 2023 00:33:47 GMT-0600 (hora estándar central) {}
// details
// : 
// Array(2)
// 0
// : 
// {id_product: 2, quantity: 1, subtotal: 99.99}
// 1
// : 
// {id_product: 4, quantity: 1, subtotal: 19.99}
// length
// : 
// 2
// [[Prototype]]
// : 
// Array(0)
// id_address
// : 
// 1
// id_payment_method
// : 
// 1
// id_user
// : 
// 118310145
// payed
// : 
// false
// total
// : 
// 119.97999999999999