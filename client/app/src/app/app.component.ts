import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AuthenticationService } from './share/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AnyMovie';
  // sideBarMode: MatDrawerMode = 'side';
  sideBarOpen = false;

  isAuth: boolean;
  currentUser: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService
  ) {
    // this.observeBreakpoints();
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuth = valor)
    );

    this.authService.roles();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
