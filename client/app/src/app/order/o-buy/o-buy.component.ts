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
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

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
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
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

  detail(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { id: id };

    this.dialog.open(OrderDialogComponent, dialogConfig);
  }

  // ----- CART
  updateQuantity(item: any) {
    if (item.quantity > item.product.quantity) {
      this.noti.message(
        'Order',
        `Only ${item.product.quantity} of this in stock`,
        MessageType.error
      );
      item.quantity = item.product.quantity;
      return;
    }
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
  }
  deleteItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.message('Order', 'Deleted Product', MessageType.warning);
  }

  registerOrder() {
    if (this.orderForm.invalid) {
      this.noti.message(
        'Order',
        'Please fill all the fields',
        MessageType.warning
      );
    }

    if (
      this.cartService.getItems != null &&
      this.orderForm.value.payment_method != null &&
      this.orderForm.value.address != null
    ) {
      let cart_item = this.cartService.getItems;

      let products = cart_item.map((x) => ({
        ['id_product']: x.idItem,
        ['quantity']: x.quantity,
        ['subtotal']: x.subtotal,
      }));

      let order_info = {
        id_user: this.idUser,
        id_payment_method: this.orderForm.value.payment_method,
        id_address: this.orderForm.value.address,
        total: this.total * 1.13,
        payed: true,
        details: products,
      };

      this.gService
        .create('transactions', order_info)
        .subscribe((answer: any) => {
          this.noti.message(
            'Order',
            'Orden registered #' + answer.id,
            MessageType.success
          );
          this.cartService.deleteCart();
          this.total = this.cartService.getTotal();
          this.router.navigate(['/']);
          this.detail(answer.id);
        });
    } else {
      this.noti.message('Order', 'Add a product to buy', MessageType.warning);
    }
  }
}
