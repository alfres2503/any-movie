import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p-index',
  templateUrl: './p-index.component.html',
  styleUrls: ['./p-index.component.css'],
})
export class PIndexComponent {
  data: any;
  categories: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  gridCols: number = 3;

  filteredData: any;

  constructor(
    private gService: GenericService,
    private breakpointObserver: BreakpointObserver,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.listProduct();
    this.listTypes();
    this.observeBreakpoints();
  }

  listProduct() {
    this.gService
      .list('products/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        console.log(apiData);
        this.data = apiData;
        this.filteredData = this.data;
      });
  }

  filterDataByName(text: string) {
    if (!text) {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter((p) =>
        p?.name.toLowerCase().includes(text.toLowerCase())
      );
    }
  }

  filterDataByCategory(categoryID: number) {
    if (!categoryID) {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter((p) =>
        p?.categories.some((c) => c.id_category === categoryID)
      );
    }
  }

  filterDataByOrder(orderBy: number) {
    if (!orderBy || orderBy == 0) {
      this.filteredData = this.data;
    }

    if (orderBy == 1) {
      this.filteredData = this.filteredData.sort((a, b) => b.price - a.price);
    }

    if (orderBy == 2) {
      this.filteredData = this.filteredData.sort((a, b) => a.price - b.price);
    }
  }

  listTypes() {
    this.gService
      .list('categories/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        // console.log(apiData);
        this.categories = apiData;
      });
  }

  // metodo para cambiar la cantidad de columnas en el grid segun el tamaño de la pantalla
  observeBreakpoints() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.gridCols = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.gridCols = 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.gridCols = 3;
        } else {
          this.gridCols = 4;
        }
      });
  }

  productDetail(id: number) {
    this.router.navigate(['/products', id]);
  }
}
