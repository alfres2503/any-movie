import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})

export class SidenavComponent {

  constructor(
    private router: Router,
  ) {  }

  productSeller(id:number){
    this.router.navigate(['/products/seller', id]);
  }
}
