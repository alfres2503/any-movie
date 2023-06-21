import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAuth: boolean;
  currentUser: any;

  ngOnInit(): void {
    this.isAuth = true;
    let user = {
      name: 'Ingeniero Suárez',
    };
    this.currentUser = user;
  }
}
