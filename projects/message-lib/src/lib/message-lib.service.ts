import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { messageInput } from 'shared-types';

@Injectable({
  providedIn: 'root'
})
export class MessageLibService {

  endpoint = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  public getMessages () {}

  public getMessage () {}

  public postMessage (message: messageInput): Observable<any> {
    return this.http.post(`${this.endpoint}/message`, message)
  }
}
