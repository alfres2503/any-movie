import { AfterViewInit, Component } from '@angular/core';
import { CartService } from 'src/app/share/cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  isAuth: boolean;
  currentUser: any;

  isSeller: boolean = false;
  isClient: boolean = false;
  isAdmin: boolean = false;

  idUser: number;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuth = valor)
    );

    this.idUser = this.authService.idUser;

    this.isSeller = this.authService.isSeller;
    this.isClient = this.authService.isClient;
    this.isAdmin = this.authService.isAdmin;
  }

  productSeller(id: number) {
    this.router.navigate(['/products/seller', id]);
  }

  orderClient(id: number) {
    this.router.navigate(['orders/client/', id]);
  }
  orderSeller(id: number) {
    this.router.navigate(['orders/seller', id]);
  }
}
