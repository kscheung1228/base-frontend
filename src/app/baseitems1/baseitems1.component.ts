import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../apiservice/upload-file.service';
import { Observable, of  } from 'rxjs';
import { FileUpload } from '../file-upload';

@Component({
  selector: 'app-baseitems1',
  templateUrl: './baseitems1.component.html',
  styleUrls: ['./baseitems1.component.scss'],
  providers: [UploadFileService]
})
export class Baseitems1Component implements OnInit {

  selectedFiles: FileList;
  showFile = false;
  fileUploads: Observable<Array<FileUpload>>;
 
  constructor(private uploadService: UploadFileService) { }
  response = new String();
  count: number;
  text: string;

  ngOnInit() {
    this.count=0
  }

  upload() {
    const file = this.selectedFiles.item(0);
    // this.text = this.uploadService.uploadfile(file,this.count);
    this.uploadService.uploadfile(file,this.count);
    console.log ("text :",this.text)
  }
  
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  showFiles(enable: boolean) {
    this.showFile = enable;
 
    if (enable) {
      this.fileUploads = this.uploadService.getFiles();
    }
  }

}
