import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { messageInput, ENV_CONFIG, EnvironmentConfig } from 'shared-types';

@Injectable({
  providedIn: 'root'
})
export class MessageLibService {

  endpoint: string

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
    this.endpoint = this.config.apiendpoint
  }

  public getMessages () {}

  public getMessage () {}

  public postMessage (message: messageInput): Observable<any> {
    return this.http.post(`${this.endpoint}/message`, message)
  }
}
