import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
@Component({
  selector: 'app-p-index',
  templateUrl: './p-index.component.html',
  styleUrls: ['./p-index.component.css'],
})
export class PIndexComponent {
  data: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  gridCols: number = 3;

  constructor(
    private gService: GenericService,
    private breakpointObserver: BreakpointObserver,
    private sanitizer: DomSanitizer
  ) {
    this.listProduct();
    this.observeBreakpoints();
  }

  listProduct() {
    this.gService
      .list('products/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        console.log(apiData);
        this.data = apiData;
      });
  }

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

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
