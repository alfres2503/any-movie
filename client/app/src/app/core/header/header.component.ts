import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/share/cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  isAuth: boolean;
  currentUser: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    //this.qtyItems = this.cartService.quantityItems();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuth = valor)
    );

    console.log(this.currentUser);
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  login() {
    this.router.navigate(['user/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['user/login']);
  }
}
