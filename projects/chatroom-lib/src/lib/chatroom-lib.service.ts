import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig, chatroom, apiresponse } from 'shared-types';

@Injectable({
  providedIn: 'root'
})
export class ChatroomLibService {
  endpoint: string

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
    this.endpoint = this.config.apiendpoint
  }

  public getChatroomsByUser (idUser: string) {
    return this.http.get<apiresponse<chatroom[]>>(`${this.endpoint}/chatroom`, { params: new HttpParams().set('userId', idUser), withCredentials: true })
  }
}
