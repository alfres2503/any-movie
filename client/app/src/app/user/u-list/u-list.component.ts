import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  MessageType,
  NotificationService,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-u-list',
  templateUrl: './u-list.component.html',
  styleUrls: ['./u-list.component.css'],
})
export class UListComponent {
  data: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'image',
    'id',
    'name',
    'phone',
    'email',
    'company_name',
    'active',
    'roles',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private sanitizer: DomSanitizer,
    private _liveAnnouncer: LiveAnnouncer,
    private notification: NotificationService
  ) {
    this.getUsers();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getUsers() {
    this.gService
      .getAll('users')
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.data = apiData;
        this.dataSource = new MatTableDataSource(this.data);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  updateUser(user: any) {
    this.gService
      .update('users/changeStatus', user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.getUsers();

        this.notification.message(
          'Success',
          'User status changed succesfully',
          MessageType.success
        );
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
