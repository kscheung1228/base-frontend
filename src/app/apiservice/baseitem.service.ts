import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Baseitem } from './baseitem';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class BaseitemsService {
  apiEndpoint = environment.APIEndpoint;
  // private stepsUrl = 'api/steps';  // URL to web api
  private baseUrl = this.apiEndpoint +'baseitems/';  // URL to web api

  // private baseUrl = 'https://jershingnotes.herokuapp.com/Baseitems/';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET steps from the server */
  getBaseitems (): Observable<Baseitem[]> {
    return this.http.get<Baseitem[]>(this.baseUrl)
      .pipe(
        tap(_ => this.log('fetched baseitems')),
        catchError(this.handleError('getBaseitems', []))
      );
  }

  /** GET step by id. Return `undefined` when id not found */
  getStepNo404<Data>(id: number): Observable<Baseitem> {
    const url = `${this.baseUrl}/?id=${id}`;
    return this.http.get<Baseitem[]>(url)
      .pipe(
        map(baseitems => baseitems[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} baseitem id=${id}`);
        }),
        catchError(this.handleError<Baseitem>(`getBaseitem id=${id}`))
      );
  }

  /** GET step by id. Will 404 if id not found */
  getBaseitem(id: number): Observable<Baseitem> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get<Baseitem>(url).pipe(
      tap(_ => this.log(`fetched baseitem id=${id}`)),
      catchError(this.handleError<Baseitem>(`getBaseitem id=${id}`))
    );
  }

  /* GET steps whose name contains search term */
  searchBaseitems(term: string): Observable<Baseitem[]> {
    if (!term.trim()) {
      // if not search term, return empty step array.
      return of([]);
    }
    return this.http.get<Baseitem[]>(`${this.baseUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found baseitems matching "${term}"`)),
      catchError(this.handleError<Baseitem[]>('searchBaseitems', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new step to the server */
  addBaseitem (baseitem: Baseitem): Observable<Baseitem> {
    return this.http.post<Baseitem>(this.baseUrl, baseitem, httpOptions).pipe(
      tap((baseitem: Baseitem) => this.log(`added baseitem w/ id=${baseitem.id}`)),
      catchError(this.handleError<Baseitem>('addbaseitem'))
    );
  }

  /** DELETE: delete the step from the server */
  deleteBaseitem (baseitem: Baseitem | number): Observable<Baseitem> {
    const id = typeof baseitem === 'number' ? baseitem : baseitem.id;
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Baseitem>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted baseitem id=${id}`)),
      catchError(this.handleError<Baseitem>('deleteBaseitem'))
    );
  }
  
  /** PUT: update the step on the server */
  updateBaseitem (baseitem: Baseitem): Observable<any> {
    const url = `${this.baseUrl}${baseitem.id}/`;
    return this.http.put(url, baseitem, httpOptions).pipe(
      tap(_ => this.log(`updated baseitem id=${baseitem.id}`)),
      catchError(this.handleError<any>('updateBaseitem'))
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
    this.messageService.add(`BaseitemsService: ${message}`);
  }
}