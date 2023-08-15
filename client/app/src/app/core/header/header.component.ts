import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/share/cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  isAuth: boolean;
  currentUser: any;
  isAdmin:boolean;
  qtyItems: Number = 0;
  qtyItemsSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuth = valor)
    );
    this.authService.roles();
    this.isAdmin= this.authService.isAdmin;

    this.qtyItems = this.cartService.quantityItems();
  }

  ngOnInit(): void{
    this.qtyItemsSubscription = this.cartService.countItems.subscribe(
      (qtyItems) => {
        this.qtyItems = qtyItems;
      }
    );
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  login() {
    this.router.navigate(['logIn']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['logIn']);
  }

  userProfile() {
    this.router.navigate([`profile/${this.authService.idUser}`]);
  }
}
