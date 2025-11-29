import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from 'shared-types';
import { chatroom } from '../../../shared-types/src/lib/chatroom';
import { apiresponse } from '../../../shared-types/src/lib/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class ChatmessageLibService {

  endpoint: string

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
    this.endpoint = this.config.apiendpoint
  }

  public getChatMessages (idRoom?: string) {
    if (idRoom) {
      let params = new HttpParams()
      params = params.set('idRoom', idRoom)
      return this.http.get(`${this.endpoint}/chatmessage`, { withCredentials: true, params })
    }
    return this.http.get(`${this.endpoint}/chatmessage`, { withCredentials: true })
  }

  // ESTO HAY QUE CAMBIARLO DE SITIO, CREAR NUEVO SERVICIO. Se obtienen los chatroom por id de usuario, no por id de room
  public getChatrooms () {
    return this.http.get<apiresponse<chatroom[]>>(`${this.endpoint}/chatroom`, { params: new HttpParams().set('userId', '68e2fc7f4a51c2f0c85296bd'), withCredentials: true })
  }
}
