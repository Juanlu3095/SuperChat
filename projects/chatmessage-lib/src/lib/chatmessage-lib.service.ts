import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig, apiresponse, chatMessage } from 'shared-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatmessageLibService {

  endpoint: string

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
    this.endpoint = this.config.apiendpoint
  }

  public getChatMessages (idRoom?: string): Observable<apiresponse<chatMessage[]>> {
    if (idRoom) {
      let params = new HttpParams()
      params = params.set('idRoom', idRoom)
      return this.http.get<apiresponse<chatMessage[]>>(`${this.endpoint}/chatmessage`, { withCredentials: true, params })
    }
    return this.http.get<apiresponse<chatMessage[]>>(`${this.endpoint}/chatmessage`, { withCredentials: true })
  }
}
