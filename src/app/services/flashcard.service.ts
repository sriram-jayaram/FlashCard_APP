import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import{ Flashcard }from '../models/flashcard.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private baseUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  fetchbyline(lineno:string):Observable<any>{
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin','*').set('mode','no-cors')
    return this.httpClient.get(`${this.baseUrl}/api/fetch/${lineno}`,{headers:headers});
  }

  fetchcount():Observable<any>{
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin','*');
    return this.httpClient.get(`${this.baseUrl}/api/count`,{headers:headers});
  }

}
