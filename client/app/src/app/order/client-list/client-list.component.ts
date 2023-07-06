import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent {
  data: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'created_at',
    'detailsLength',
    'total',
    'payed',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.checkOrdersById();
  }

  // Lifecycle hooks
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // Public methods
  detail(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { id: id };

    this.dialog.open(OrderDialogComponent, dialogConfig);
  }

  // Private methods
  checkOrdersById(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) this.ordersList(Number(id));
  }

  ordersList(id: number) {
    this.gService
      .get('transactions/user', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.data = apiData;
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
