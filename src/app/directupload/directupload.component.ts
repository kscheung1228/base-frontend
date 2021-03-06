import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { FormControl, FormGroup, Validators, NgForm , FormBuilder} from '@angular/forms';

import { FileUploadClientService } from '../apiservice/file-client/file-client.service';



@Component({
  selector: 'app-directupload',
  templateUrl: './directupload.component.html',
  styleUrls: ['./directupload.component.scss']
})
export class DirectuploadComponent implements OnInit, OnDestroy {
  statusCreateForm: FormGroup;
  // fileDescriptionCtrl: FormControl;
  fileToUpload: File  = null;
  uploadProgress:number = 0;
  uploadComplete:boolean = false;
  uploadingProgressing:boolean = false;
  fileUploadSub: any;
  serverResponse: any;

  @ViewChild('myInput')
  myFileInput: any;


  constructor(
      private fileUploadService: FileUploadClientService,
      private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    /* initilize the form and/or extra form fields
        Do not initialize the file field
    */
  // this.fileDescription  = new FormControl("", [
  //         Validators.required,
  //         Validators.minLength(4),
  //         Validators.maxLength(280)
  //    ])
  // this.statusCreateForm = new FormGroup({
  //     'description': this.fileDescription,
  // })

  this.statusCreateForm = this.formBuilder.group({
    fileDescription: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(200)]],
  });
}

  // convenience getter for easy access to form fields
  get f() { return this.statusCreateForm.controls; }

  ngOnDestroy (){
      if (this.fileUploadSub){
          this.fileUploadSub.unsubscribe()
      }
  }

  handleProgress(event){
  if (event.type === HttpEventType.DownloadProgress) {
      this.uploadingProgressing =true
      this.uploadProgress = Math.round(100 * event.loaded / event.total)
    }

    if (event.type === HttpEventType.UploadProgress) {
      this.uploadingProgressing =true
      this.uploadProgress = Math.round(100 * event.loaded / event.total)
    }

    if (event.type === HttpEventType.Response) {
      // console.log(event.body);
      this.uploadComplete = true
      this.serverResponse = event.body
    }
  }
  handleSubmit(event:any, statusNgForm:NgForm, statusFormGroup:FormGroup){
    event.preventDefault()
    if (statusNgForm.submitted){
        this.fileUploadService.getpolicy;
        let submittedData = statusFormGroup.value
        this.fileUploadSub = this.fileUploadService.fileUpload(
              this.fileToUpload, 
            //   submittedData).subscribe(
                this.fileToUpload).subscribe(
                  event=>this.handleProgress(event), 
                  error=>{
                      console.log("Server error")
                      console.log(error)
                  });

        statusNgForm.resetForm({})
    }
}


  handleFileInput(files: FileList) {
      let fileItem = files.item(0);
      console.log("file input has changed. The file is", fileItem)
      this.fileToUpload = fileItem
  }

  resetFileInput() {
      console.log(this.myFileInput.nativeElement.files);
      this.myFileInput.nativeElement.value = "";
      console.log(this.myFileInput.nativeElement.files);
  }


}
