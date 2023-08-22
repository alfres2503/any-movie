import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-r-seller',
  templateUrl: './r-seller.component.html',
  styleUrls: ['./r-seller.component.css'],
})
export class RSellerComponent {
  id_user: number;

  best_seller_name: string;
  best_seller_quantity: number;

  best_client_name: string;
  best_client_quantity: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataTable: any;
  displayedColumns = ['sold_product', 'purchase_count', 'purchase_total'];
  dataSource = new MatTableDataSource<any>();
  today: Date;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    //this.id_user = this.authService.idUser;
    this.id_user = 118310145;

    this.best_seller();
    this.best_client();
    this.rating();
    this.today = new Date();
  }

  best_seller() {
    this.gService
      .get('reports/seller/mostSoldProduct', this.id_user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        console.log(apiData);
        this.best_seller_name = apiData.map((x) => x.prod_name)
        this.best_seller_quantity = apiData.map((x) => x.total_quantity)
      });
  }

  best_client() {
    this.gService
      .get('reports/seller/clientWithMostSales', this.id_user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        console.log(apiData);
        this.best_client_name = apiData.map((x) => x.name)
        this.best_client_quantity = apiData.map((x) => x.total_quantity)
      });
  }

  // TABLE
  rating() {
    this.gService
      .list('reports/admin/salesPerDay')
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.dataTable = apiData;
        this.dataSource = new MatTableDataSource(this.dataTable);
        console.log(apiData);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
