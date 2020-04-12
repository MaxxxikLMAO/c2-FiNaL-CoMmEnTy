import { Component, OnInit } from '@angular/core';
import {User} from '../../services/models/user.interface';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {httpConfig} from '../../config/http-config';
import { Router } from "@angular/router";


@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private users: User[] = [];
  p: number = 1;
  private headers = new HttpHeaders().set(
    "User_token", this.authenticationService.getToken()
  );

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private httpClient: HttpClient, private router: Router) { 
    
  }

  commentsPost() {
    let body = {
      body: "Max testuje O_O", user_id: 65
    }

    let url = httpConfig.url + "comments"

    this.httpClient.post(url, body, {
      headers: this.headers, observe: "response"
    })
    .subscribe(data => {
      console.log(data);
    });
  }

  commentsGet() {

    let url = httpConfig.url + "comments"

    this.httpClient.get(url, {headers: this.headers})

    .subscribe(data => { // vypisování do stránky
      console.log(data);
      
    },error => {
      console.log(error);
      
    })
  }


  ngOnInit() { // metoda která se pouští jako první

    if (localStorage.getItem("access-token")) { // pokud je access-token ve storagi

      this.authenticationService.setToken(localStorage.getItem("access-token")) //savuje access-token do storage

      this.router.navigate(["/users"]) // díky tomuto se přemisťuju do jiných stránek

    } else {
      this.router.navigate(["/login"]) // přemístění do loginu
    }

    this.userService.getUsers(0).subscribe(i => this.users = i.users);

    console.log(this.authenticationService.getToken());   

  }

}
