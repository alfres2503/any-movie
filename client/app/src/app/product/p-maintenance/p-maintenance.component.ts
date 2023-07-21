import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-p-maintenance',
  templateUrl: './p-maintenance.component.html',
  styleUrls: ['./p-maintenance.component.css'],
})
export class PMaintenanceComponent {
  data: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['image', 'name', 'price', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private sanitizer: DomSanitizer,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.checkProductSellerById();
  }

  // Lifecycle hooks
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // Public methods
  detail(id: number) {
    this.router.navigate(['/products', id], {
      relativeTo: this.route,
    });
  }

  update(id: number) {
    this.router.navigate(['/products/update', id], {
      relativeTo: this.route,
    });
  }

  getImageUrl(image) {
    let binary = '';
    const bytes = new Uint8Array(image);

    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const imageUrl = 'data:image/jpeg;base64,' + window.btoa(binary);

    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  // Private methods
  checkProductSellerById(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) this.productSeller(Number(id));
  }

  productSeller(id: number) {
    this.gService
      .get('products/seller', id)
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
