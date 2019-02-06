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

@NgModule({
  declarations: [
    AppComponent,
    BaseitemsComponent,
    Baseitems1Component,
    DetailsUploadComponent,
    DirectuploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FileUploadClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
