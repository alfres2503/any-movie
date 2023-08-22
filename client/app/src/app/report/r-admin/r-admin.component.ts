import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-r-admin',
  templateUrl: './r-admin.component.html',
  styleUrls: ['./r-admin.component.css'],
})
export class RAdminComponent {
  @ViewChild('canvas_graphic_best_products') canvas_graphic_best_products!: {
    nativeElement: any;
  };
  dataBestProducts: any;
  canvasBestProducts: any;
  ctxBestProducts: any;
  graphicBestProducts: any;

  month_list: any;
  filter = 1;

  @ViewChild('canvas_graphic_worst_products') canvas_graphic_worst_products!: {
    nativeElement: any;
  };
  dataWorstProducts: any;
  canvasWorstProducts: any;
  ctxWorstProducts: any;
  graphicWorstProducts: any;

  @ViewChild('canvas_graphic_best_sellers') canvas_graphic_best_sellers!: {
    nativeElement: any;
  };
  dataBestSellers: any;
  canvasBestSellers: any;
  ctxBestSellers: any;
  graphicBestSellers: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataTable: any;
  displayedColumns = ['sold_product', 'purchase_count', 'purchase_total'];
  dataSource = new MatTableDataSource<any>();
  today: Date;

  destroy$: Subject<boolean> = new Subject<boolean>();

  
  constructor(private gService: GenericService,
    private authService: AuthenticationService) {
    this.monthList();
    this.initGraphics();
    this.soldProducts();
    this.initGraphicBestProducts(this.filter);
    this.today = new Date();
  }

  monthList() {
    this.month_list = [
      { Value: 1, Text: 'January' },
      { Value: 2, Text: 'February' },
      { Value: 3, Text: 'March' },
      { Value: 4, Text: 'April' },
      { Value: 5, Text: 'May' },
      { Value: 6, Text: 'June' },
      { Value: 7, Text: 'July' },
      { Value: 8, Text: 'August' },
      { Value: 9, Text: 'September' },
      { Value: 10, Text: 'October' },
      { Value: 11, Text: 'November' },
      { Value: 12, Text: 'December' },
    ];
  }

  initGraphicBestProducts(newValue: any) {
    this.filter = newValue;

    if (this.filter) {
      this.gService
        .get('reports/admin/top5Products', this.filter)
        .pipe(takeUntil(this.destroy$))
        .subscribe((datas: any) => {
          this.dataBestProducts = datas;
          this.graphicBrowserBestProducts();
        });
    }
  }

  initGraphics() {
    this.gService
      .list('reports/admin/top3Products')
      .pipe(takeUntil(this.destroy$))
      .subscribe((datas: any) => {
        this.dataWorstProducts = datas;
        this.graphicBrowserWorstProducts();
      });

    this.gService
      .list('reports/admin/top5Seller')
      .pipe(takeUntil(this.destroy$))
      .subscribe((datas: any) => {
        this.dataBestSellers = datas;
        this.graphicBrowserBestSeller();
      });
  }

  graphicBrowserBestProducts(): void {
    this.canvasBestProducts = this.canvas_graphic_best_products.nativeElement;
    this.ctxBestProducts = this.canvasBestProducts.getContext('2d');
    if (this.graphicBestProducts) {
      this.graphicBestProducts.destroy();
    }
    this.graphicBestProducts = new Chart(this.ctxBestProducts, {
      type: 'pie',
      data: {
        labels: this.dataBestProducts.map((x) => x.product_name),
        datasets: [
          {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            backgroundColor: [
              'rgba(56, 17, 98, 0.4)',
              'rgba(94, 40, 137, 0.4)',
              'rgba(126, 25, 255, 0.4)',
              'rgba(148, 108, 178, 0.4)',
              'rgba(197, 152, 255, 0.4)',
              'rgba(140, 50, 255, 0.4)',
            ],

            data: this.dataBestProducts.map((x) => x.total_quantity),
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
  }

  graphicBrowserBestSeller(): void {
    this.canvasBestSellers = this.canvas_graphic_best_sellers.nativeElement;
    this.ctxBestSellers = this.canvasBestSellers.getContext('2d');
    if (this.graphicBestSellers) {
      this.graphicBestSellers.destroy();
    }
    this.graphicBestSellers = new Chart(this.ctxBestSellers, {
      type: 'bar',
      data: {
        labels: this.dataBestSellers.map((x) => x.seller_name),
        datasets: [
          {
            label: 'Seller Rating', // Add a label to the dataset
            borderColor: 'rgba(0, 0, 0, 0.2)',
            backgroundColor: [
              'rgba(0, 119, 76, 0.4)',
              'rgba(0, 155, 116, 0.4)',
              'rgba(37, 255, 163, 0.4)',
              'rgba(77, 191, 163, 0.4)',
              'rgba(165, 255, 217, 0.4)',
              'rgba(140, 50, 255, 0.4)',
            ],
            data: this.dataBestSellers.map((x) => x.average_seller_rating),
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
  }

  graphicBrowserWorstProducts(): void {
    this.canvasWorstProducts = this.canvas_graphic_worst_products.nativeElement;
    this.ctxWorstProducts = this.canvasWorstProducts.getContext('2d');
    if (this.graphicWorstProducts) {
      this.graphicBestProducts.destroy();
    }
    this.graphicWorstProducts = new Chart(this.ctxWorstProducts, {
      type: 'line',
      data: {
        labels: this.dataWorstProducts.map((x) => x.product_name),
        datasets: [
          {
            label: 'Worst Rating',
            borderColor: 'rgba(0, 0, 0, 0.2)',
            backgroundColor: [
              'rgba(197, 152, 255, 0.4)',
              'rgba(148, 108, 178, 0.4)',
              'rgba(126, 25, 255, 0.4)',
              'rgba(94, 40, 137, 0.4)',
              'rgba(56, 17, 98, 0.4)',
              'rgba(140, 50, 255, 0.4)',
            ],

            data: this.dataWorstProducts.map((x) => x.avg_product_rating),
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
  }

  soldProducts() {
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

//GRAPH COLOR
// PURPLE
// A100: rgb(197, 152, 255),
// 300: rgb(148, 108, 178),
// A700: rgb(126, 25, 255),
// 600: rgb(94, 40, 137),
// 900: rgb(56, 17, 98),

//GREEN
// A100: rgb(165, 255, 217),
// 300: rgb(77, 191, 163),
// A700: rgb(37, 255, 163),
// 600: rgb(0, 155, 116),
// 900: rgb(0, 119, 76),
