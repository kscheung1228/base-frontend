import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Baseitem } from '../apiservice/baseitem';
import { BaseitemsService } from '../apiservice/baseitem.service';
import { S3fileService } from '../apiservice/s3file.service';
import { S3Filepolicy, S3File } from '../apiservice/s3File';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Url } from 'url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadFileService } from '../apiservice/upload-file.service';
import { count } from 'rxjs/operators';
// import * as AWS from 'aws-sdk';


@Component({
  selector: 'app-baseitems',
  templateUrl: './baseitems.component.html',
  styleUrls: ['./baseitems.component.scss'],
  providers: [BaseitemsService,UploadFileService]
})
export class BaseitemsComponent implements OnInit {
  
  baseitems: Array<Baseitem>;
  form: FormGroup;
  loading: boolean = false;

  selectedFiles: FileList;
 

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private baseitemservice: BaseitemsService, private s3fileService: S3fileService,private fb: FormBuilder ,private http: HttpClient,private uploadService: UploadFileService) {
    this.createForm();
   }


  ngOnInit() {
    // this.count = 0;
    this.getBaseitems();
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadfile(file,count);
    // this.count =this.count+1;
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  getBaseitems(): void {
    this.baseitemservice.getBaseitems()
    .subscribe(baseitems => this.baseitems = baseitems);
  }
  


  add(itemname: string,itemfile: string): void {
    // if (!category) { return; }
    this.baseitemservice.addBaseitem({ itemfile , itemname } as Baseitem)
      .subscribe(baseitem => {
        this.baseitems.push(baseitem);
      });
  }

  fileEvent(fileInput: any) {
    
    let file = fileInput.target.files[0];

    let s3policy = new S3Filepolicy();
    s3policy.name = file.name;
    s3policy.raw_filename = file.name;
    s3policy.filetype = file.type;
    console.log ("uplaodedfile",s3policy)
    console.log ("FILE DATA",file)
    this.s3fileService.addS3filepolicy(s3policy as S3Filepolicy)
    .subscribe(response => {
      console.log (response['url']);
      console.log (response);

      this.form = this.fb.group({
        data: response['fields'],
        file: file,
      });
      
      // this.s3fileService.addS3file(file as S3File, response['url'] as string , response['fields'] as string).subscribe(response => {});
      this.http.post(response['url'], this.form.value).subscribe((val) => {
        console.log('val:',val);
        });
    })
    ;

      // key = 'cfe-tests/screen_shot.png'
  // policy_url = f'http://127.0.0.1:8000/upload/policy/'
  // post_data = None
  // data={'name':'screen_shot.png','raw_filename':'screen_shot.png','filetype':'images/png'}
  // r = requests.post(policy_url, json=data)
  // if r.status_code in range(200, 299):
  //     # print(r.json())
  //     post_data = r.json()
  //     print(post_data)
  // print('policy', r.status_code)
  

  // with open(file_path, 'rb') as data:
  //   files = {'file': data}
  //   url = post_data['url']
  //   request_data = post_data['fields']

  //   r = requests.post(url, data=request_data, files=files)
  //   print(r.status_code) # range of 200 299, 204

  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          // value: reader.result.split(',')[1]
        })
      };
    }
  }

  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    setTimeout(() => {
      console.log(formModel);
      alert('done!');
      this.loading = false;
    }, 1000);
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }



// const bucket = new S3(
//   {
//     accessKeyId: 'AKIAI3R3ENTXROWAVZVA',
//     secretAccessKey: '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',
//     region: 'us-west-2'
//   }
// );
 
// const params = {
//   Bucket: 'kscheung1228base',
//   Key: 'jsa-s3/' + file.name,
//   Body: file
// };
 
// bucket.upload(params, function (err, data) {
//   // ...
// });

}

