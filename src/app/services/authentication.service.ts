import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {httpConfig} from '../config/http-config';
import {map} from 'rxjs/operators';
import {Token} from './models/token.interface';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{

  private token: string | null = null;

  public get isLoggedIn() {
    return this.token !== null;
  }

  constructor(
    private httpClient: HttpClient, 
    private router: Router
    
  ) {
  }

  public getToken(): string {
    return this.token;
  }

  public getLogin(email: string, password: string): Observable<Token> {
    return this.httpClient.post<Token>('http://85.160.64.233:3000/session/login', {
      email, password
    }).pipe(  // trochu jinačí subscribe
      map<Token, Token>(i => {
        this.token = i.access_token; // access-token
        localStorage.setItem("access-token", i.access_token); // ukládání do local storage
        return i;
      })
    );
  }

  public getRegister(username: string, email: string, password: string, passwordConfirm: string): Observable<void> {
    return this.httpClient.post<void>(httpConfig.url + '/session/register', {
      username,
      email,
      password,
      password_confirmation: passwordConfirm,
    });
  }

  public setToken(token) {
    this.token = token
  }

  ngOnInit() {
    
  }

}
