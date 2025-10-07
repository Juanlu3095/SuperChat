import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createUserInput, ENV_CONFIG, EnvironmentConfig, loginUserInput } from 'shared-types';

@Injectable({
  providedIn: 'root'
})
export class AuthLibService {

  endpoint: string

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
    this.endpoint = this.config.apiendpoint
  }

  public register (createUserInput: createUserInput): Observable<any> {
    return this.http.post(`${this.endpoint}/auth/register`, createUserInput)
  }

  public login (loginUserInput: loginUserInput): Observable<any> {
    return this.http.post(`${this.endpoint}/auth/login`, loginUserInput)
  }
}
