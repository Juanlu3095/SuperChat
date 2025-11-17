import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from 'shared-types';

@Injectable({
  providedIn: 'root'
})
export class ChatmessageLibService {

  endpoint: string

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
    this.endpoint = this.config.apiendpoint
  }

  public getChatMessages () {
    return this.http.get(`${this.endpoint}/chatmessage`, { withCredentials: true })
  }
}
