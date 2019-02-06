import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of  } from 'rxjs';
import { FileUpload } from '../file-upload';

 
@Injectable()
export class UploadFileService {
 
  FOLDER = 'jsa-s/';
  text: string;
 
  constructor() { }
 
  
  uploadfile(file, count){
 
    const bucket = new S3(
      {
        accessKeyId: 'AKIAI3R3ENTXROWAVZVA',
        secretAccessKey: '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',
        region: 'us-west-2'
      }
    );
//  https://medium.com/@natchiketa/angular-cli-and-os-environment-variables-4cfa3b849659


// const bucket = new S3(
//     {
//       accessKeyId: "${process.env.AWS_ACCESS_KEY_ID}",
//       secretAccessKey: "${process.env.AWS_SECRET_ACCESS_KEY}",
//       region: 'us-west-2'
//     }
//   );

    const params = {
      Bucket: 'kscheung1228base',
      Key: this.FOLDER + count +'/'+file.name,
      Body: file,
      ACL: 'public-read'
    };

    var upload = bucket.upload(params);
    var promise = upload.promise();
    promise.then(function(data) { 
        console.log('Successfully uploaded file.', data);
        return data
        
    }, function(err) { 
        console.log('There was an error uploading your file: ', err);
        return false
    });

    // bucket.upload(params, function (err, data) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     this.text = err
    //     return false;
   
    //   }
 
    //   console.log('Successfully uploaded file.', data);
    //   this.text = data
    //   return true;
    // });

    
  }



  private getS3Bucket(): any {
    const bucket = new S3(
      {
        accessKeyId: 'AKIAI3R3ENTXROWAVZVA',
        secretAccessKey: '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',
        region: 'us-west-2'
      }
    );
 
    return bucket;
  }

  getFiles(): Observable<Array<FileUpload>> {
    

    const fileUploads = new Array<FileUpload>();
 
    const params = {
      Bucket: 'kscheung1228base',
      Prefix: this.FOLDER
    };
 
    this.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }
 
      console.log('Successfully get files.', data);
 
      const fileDatas = data.Contents;
 
      fileDatas.forEach(function (file) {
        fileUploads.push(new FileUpload(file.Key, 'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key));
      });
    });
 
    return of(fileUploads);
  }
 
}


    // var s3UploadPromise = new Promise(function(resolve, reject) {
    //     bucket.upload(params, function (err, data) {
    //         if (err) {
    //             reject(err);
    //         }
    //             resolve(data);
    //       });
    // });