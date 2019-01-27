import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { environment } from '../../environments/environment';
import {S3File} from './s3File'
import {S3Filepolicy} from './s3File'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class S3fileService {
  apiEndpoint = environment.APIEndpoint;
  // private stepsUrl = 'api/steps';  // URL to web api
  private baseUrl = this.apiEndpoint +'s3files/';  // URL to web api

  // private baseUrl = 'https://jershingnotes.herokuapp.com/S3files/';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET steps from the server */
  getS3files (): Observable<S3File[]> {
    return this.http.get<S3File[]>(this.baseUrl)
      .pipe(
        tap(_ => this.log('fetched s3files')),
        catchError(this.handleError('getS3files', []))
      );
  }

  /** GET step by id. Return `undefined` when id not found */
  getStepNo404<Data>(id: number): Observable<S3File> {
    const url = `${this.baseUrl}/?id=${id}`;
    return this.http.get<S3File[]>(url)
      .pipe(
        map(s3files => s3files[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} s3file id=${id}`);
        }),
        catchError(this.handleError<S3File>(`getS3file id=${id}`))
      );
  }

  /** GET step by id. Will 404 if id not found */
  getS3file(id: number): Observable<S3File> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get<S3File>(url).pipe(
      tap(_ => this.log(`fetched s3file id=${id}`)),
      catchError(this.handleError<S3File>(`getS3file id=${id}`))
    );
  }

  /* GET steps whose name contains search term */
  searchS3files(term: string): Observable<S3File[]> {
    if (!term.trim()) {
      // if not search term, return empty step array.
      return of([]);
    }
    return this.http.get<S3File[]>(`${this.baseUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found s3files matching "${term}"`)),
      catchError(this.handleError<S3File[]>('searchS3files', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new step to the server */
  addS3file (s3file: S3File, url: string, data:string): Observable<S3File> {
    return this.http.post<S3File>(url, s3file, httpOptions).pipe(
      tap((s3file: S3File) => this.log(`added s3file w/ id=${s3file.id}`)),
      catchError(this.handleError<S3File>('adds3file'))
    );
  }

  addS3filepolicy (s3filepolicy: S3Filepolicy): Observable<S3Filepolicy> {
    return this.http.post<S3Filepolicy>(this.baseUrl+"upload/policy/", s3filepolicy, httpOptions).pipe(
      tap((s3filepolicy: S3Filepolicy) => this.log(`added s3file w/ id=${s3filepolicy.id}`)),
      catchError(this.handleError<S3Filepolicy>('adds3file'))
    );
  }

  // addawsfile (s3file: S3File, url: string, data:string): Observable<S3File> {
  //   return this.http.post<S3File>(url, s3file, httpOptions).pipe(
  //     tap((s3file: S3File) => this.log(`added s3file w/ id=${s3file.id}`)),
  //     catchError(this.handleError<S3File>('adds3file'))
  //   );
  // }







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
  
  
  
  
  
  // # Direct to s3 via Python
  // file_path = 'screen.png'
  // with open(file_path, 'rb') as data:
  //     files = {'file': data}
  //     url = post_data['url']
  //     request_data = post_data['fields']
  
  //     r = requests.post(url, data=request_data, files=files)
  //     print(r.status_code) # range of 200 299, 204


  /** DELETE: delete the step from the server */
  deleteS3file (s3file: S3File | number): Observable<S3File> {
    const id = typeof s3file === 'number' ? s3file : s3file.id;
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<S3File>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted s3file id=${id}`)),
      catchError(this.handleError<S3File>('deleteS3file'))
    );
  }
  
  /** PUT: update the step on the server */
  updateS3file (s3file: S3File): Observable<any> {
    const url = `${this.baseUrl}${s3file.id}/`;
    return this.http.put(url, s3file, httpOptions).pipe(
      tap(_ => this.log(`updated s3file id=${s3file.id}`)),
      catchError(this.handleError<any>('updateS3file'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StepService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`S3fileService: ${message}`);
  }
}