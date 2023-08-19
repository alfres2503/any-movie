import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { MarkAsDeliveredComponent } from '../mark-as-delivered/mark-as-delivered.component';
import {
  MessageType,
  NotificationService,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css'],
})
export class SellerListComponent implements AfterViewInit {
  data: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'created_at',
    'product',
    'quantity',
    'client_feedback',
    'arrivalDate',
    'actions',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {
    this.checkOrdersById();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // Lifecycle hooks
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  detail(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { id: id };
    dialogConfig.width = '90vw';

    this.dialog.open(OrderDialogComponent, dialogConfig);
  }

  markAsDelivered(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { id: id };
    dialogConfig.width = '90vw';

    this.dialog.open(MarkAsDeliveredComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe((res) => {
      this.checkOrdersById();
      // this.notification.message(
      //   'Success',
      //   'Order marked as delivered',
      //   MessageType.success
      // );
    });
  }

  checkOrdersById(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) this.ordersList(Number(id));
  }

  ordersList(id: number) {
    this.gService
      .get('transactions/seller', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.data = apiData;

        console.log(this.data);

        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
