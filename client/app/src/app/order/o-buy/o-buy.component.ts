import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificationService, MessageType } from 'src/app/share/notification.service';

@Component({
  selector: 'app-o-buy',
  templateUrl: './o-buy.component.html',
  styleUrls: ['./o-buy.component.css']
})
export class OBuyComponent {
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  //Tabla
  displayedColumns: string[] = ['product', 'price', 'quantity', 'subtotal','actions'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private cartService: CartService,
    private noti: NotificationService,
    private gService: GenericService,
  ) {}

  ngOnInit(): void {
   this.cartService.currentDataCart$.subscribe(data=>{
    this.dataSource=new MatTableDataSource(data)
   })
   this.total=this.cartService.getTotal()
   this.cartService.bababab();
  }
  updateQuantity(item: any) {
    this.cartService.addToCart(item);
    this.total=this.cartService.getTotal();
    
  }
  deleteItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total=this.cartService.getTotal();
    this.noti.message('Order',
    'Deleted Product',
    MessageType.warning)
  }

  registerOrder() {
   if(this.cartService.getItems!=null){
      //Obtener los items del carrito de compras
      let cart_item=this.cartService.getItems;
      //Armar la estructura de la tabla intermedia
      //[{'videojuegoId':valor, 'cantidad':valor}]
      let details=cart_item.map(
        x=>({
          ['id']:x.idItem,
          ['quantity']: x.quantity
        })
      )
      //Datos para el API
      let order_info={
        'date': new Date(this.fecha),
        'products':details
      }
      this.gService.create('orden',order_info)
      .subscribe((answer:any)=>{
        this.noti.message('Order',
        'Orden registered #'+answer.id,
        MessageType.success)
        this.cartService.deleteCart();
        this.total=this.cartService.getTotal();
        console.log(answer)
      })
   }else{
    this.noti.message('Order',
    'Add a product to buy',
    MessageType.warning)
   }
  }
}
