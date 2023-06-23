import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AnyMovie';
  sideBarMode: MatDrawerMode = 'side';
  sideBarOpen = true;

  // El breakpointObserver es un servicio que permite observar los cambios en el tamaño de la pantalla
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.sideBarMode = 'over';
          this.sideBarOpen = false;
        } else {
          this.sideBarMode = 'side';
        }
      });
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
