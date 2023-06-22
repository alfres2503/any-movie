import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  isAuth: boolean;
  currentUser: any;

  ngOnInit(): void {
    this.isAuth = true;
    let user = {
      name: 'Pala',
    };
    this.currentUser = user;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
