import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { messageInput } from '../../../shared-types/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class MessageLibService {

  endpoint = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  public getMessages () {}

  public getMessage () {}

  public postMessage (message: messageInput) {
    return this.http.post(`${this.endpoint}/message`, message)
  }
}
