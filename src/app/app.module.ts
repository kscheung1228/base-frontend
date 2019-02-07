import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseitemsComponent } from './baseitems/baseitems.component';
import { Baseitems1Component } from './baseitems1/baseitems1.component';
import { DetailsUploadComponent } from './details-upload/details-upload.component';
import { DirectuploadComponent } from './directupload/directupload.component';
import { FileUploadClientService } from './apiservice/file-client/file-client.service';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule,MatFormFieldModule,MatInputModule, } from "@angular/material";
import {MatButtonModule} from '@angular/material/button';

import { JwtInterceptor,  } from './jwtservice/jwt.interceptor';
import { ErrorInterceptor } from './jwtservice/error.interceptor';
import { ErrorDialogComponent } from './jwtservice/error-dialog/errordialog.component';
import { ErrorDialogService } from './jwtservice/error-dialog/errordialog.service';
import { HttpConfigInterceptor } from './jwtservice/httpconfig.interceptor';
import { LoginComponent } from './jwtservice/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseitemsComponent,
    Baseitems1Component,
    DetailsUploadComponent,
    DirectuploadComponent,
    LoginComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    FileUploadClientService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },  //to log out when 401
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent]
})
export class AppModule { }
