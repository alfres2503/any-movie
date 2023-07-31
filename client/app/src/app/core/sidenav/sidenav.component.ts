import { Component } from '@angular/core';
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

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuth = valor)
    );

    console.log(this.currentUser);
  }

  productSeller(id: number) {
    this.router.navigate(['/products/seller', id]);
  }
}
