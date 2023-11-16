import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) {
    
  }
  getData<Type> (url: string) {
    return this.http.get<Type>(url);
  }

  deleteItem (url: string) {
    let header = new HttpHeaders({'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0RE9XMnJoOE9tbjNpdk1NU0'});
    return this.http.delete(url, {headers: header});
  }

  post<Type>(url: string, value: any) {
    let header = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.post(url, value, {headers: header});
  }
  postlog(obj: any): Observable<any>{
    return this.http.post(environment.token.get, obj);
  }

  put<Type>(url: string, data: Type) {
    let header = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.put(url, data, {headers: header});
  }
}
