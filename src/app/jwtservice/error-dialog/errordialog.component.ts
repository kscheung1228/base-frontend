import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
// import { ErrorDialogService } from './errordialog.service';
@Component({
  selector: 'app-root',
  templateUrl: './errordialog.component.html',
//   providers: [ErrorDialogService]
})
export class ErrorDialogComponent {
  title = 'Angular-Interceptor';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}