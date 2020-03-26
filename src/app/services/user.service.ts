import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './models/user.interface';
import {UsersList} from './models/users-list';
import {AuthenticationService} from './authentication.service';
import {httpConfig} from '../config/http-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  public getUsers(): Observable<UsersList> {
    const headers = new HttpHeaders()
      .set('User-Token', this.authenticationService.getToken());

    return this.httpClient.get<UsersList>(httpConfig.url + '/users', {headers});
  }
}
