import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  data: any;
  randomProduct1: any;
  randomProduct2: any;
  randomProduct3: any;

  constructor(
    private authService: AuthenticationService,
    private gService: GenericService
  ) {
    this.listProduct();
    // this.randomProducts();
  }

  ngOnInit(): void {}

  listProduct() {
    this.gService
      .list('products/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.data = apiData;
        this.randomProducts();
      });
  }

  randomProducts() {
    const randomIndex1 = Math.floor(Math.random() * this.data.length);
    this.randomProduct1 = this.data[randomIndex1];
    this.data.splice(randomIndex1, 1);

    const randomIndex2 = Math.floor(Math.random() * (this.data.length - 1));
    this.randomProduct2 = this.data[randomIndex2];
    this.data.splice(randomIndex2, 1);

    const randomIndex3 = Math.floor(Math.random() * (this.data.length - 2));
    this.randomProduct3 = this.data[randomIndex3];
  }
}
