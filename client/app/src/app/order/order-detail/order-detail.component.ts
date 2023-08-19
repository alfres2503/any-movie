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
import { SubmitReviewComponent } from '../submit-review/submit-review.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent {
  data: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  id: any;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'product',
    'quantity',
    'price',
    'seller',
    'seller_feedback',
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOrder();
    //this.checkOrdersById();
  }

  submitReview(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { id: id };
    dialogConfig.width = '90vw';

    this.dialog.open(SubmitReviewComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe((res) => {
      this.getOrder();
      // this.notification.message(
      //   'Success',
      //   'Order marked as delivered',
      //   MessageType.success
      // );
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getOrder() {
    this.gService
      .get('transactions', this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.data = apiData;

        console.log(this.data);

        this.dataSource.connect();
        this.dataSource = new MatTableDataSource(this.data.details);
      });
  }
}
