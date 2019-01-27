import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of, Pr } from 'rxjs';
 
@Injectable()
export class UploadFileService {
 
  FOLDER = 'jsa-s/';
  text: string;
 
  constructor() { }
 
  
  uploadfile(file, count):Pr {
 
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
 
}


    // var s3UploadPromise = new Promise(function(resolve, reject) {
    //     bucket.upload(params, function (err, data) {
    //         if (err) {
    //             reject(err);
    //         }
    //             resolve(data);
    //       });
    // });