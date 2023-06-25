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
  // sideBarMode: MatDrawerMode = 'side';
  sideBarOpen = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    // this.observeBreakpoints();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  // observeBreakpoints() {
  //   this.breakpointObserver
  //     .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
  //     .subscribe((result) => {
  //       if (result.breakpoints[Breakpoints.XSmall]) {
  //         this.sideBarMode = 'over';
  //         this.sideBarOpen = false;
  //       } else if (result.breakpoints[Breakpoints.Small]) {
  //         this.sideBarMode = 'over';
  //       } else if (result.breakpoints[Breakpoints.Medium]) {
  //         this.sideBarMode = 'over';
  //       } else {
  //         this.sideBarMode = 'side';
  //       }
  //     });
  // }
}
