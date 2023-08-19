import { GenericService } from 'src/app/share/generic.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css'],
})
export class OrderDialogComponent implements OnInit {
  data: any;
  dataDialog: any;

  tableDataSource = new MatTableDataSource<any>();

  displayedColumns = [
    'name',
    // 'seller',
    'quantity',
    'price',
    //'seller_feedback',
    //'actions',
  ];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    private gService: GenericService
  ) {
    this.dataDialog = data;
  }

  ngOnInit(): void {
    if (this.dataDialog.id) {
      this.getOrder(this.dataDialog.id);
    }
  }

  getOrder(id: any) {
    this.gService
      .get('transactions', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.data = apiData;

        console.log(this.data);

        this.tableDataSource.connect();
        this.tableDataSource = new MatTableDataSource(this.data.details);
      });
  }

  close() {
    this.dialogRef.close();
  }
}
