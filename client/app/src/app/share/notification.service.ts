import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
export enum MessageType {
  error,
  info,
  success,
  warning,
}
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  options: IndividualConfig;
  constructor(private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;

    this.options.enableHtml = true;

    this.options.positionClass = 'toast-top-center';
    this.options.disableTimeOut = false;
    this.options.closeButton = true;
  }

  public message(title: string, message: string, type: MessageType) {
    this.toastr.show(
      message,
      title,
      this.options,
      'toast-' + MessageType[type]
    );
  }
}
