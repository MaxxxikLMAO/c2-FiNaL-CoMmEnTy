import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(private httpClient: HttpClient, private router: Router,) {
    
    
  }

  username;
  email;
  password;
  checkpassword;
  url = 'http://85.160.64.233:3000/';

  sendRegistr() {
    let body = {
      username: this.username,
      email: this.email,
      password: this.password,
      password_confirmation: this.checkpassword,
    }
    this.httpClient.post(this.url + 'session/register', body).subscribe(
      (data) => {
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

}
