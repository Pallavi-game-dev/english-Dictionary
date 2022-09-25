import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError,catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) {}

  getData(word:any){
  
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*',
    });
    headers.set('Content-Type', 'text/xml');
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+word;
    return this.http.get(url, {
        headers,
        responseType: 'text'
    })
    .pipe(
      catchError((err) => {
        return throwError(err);    //Rethrow it back to component
      }));
  }
}
