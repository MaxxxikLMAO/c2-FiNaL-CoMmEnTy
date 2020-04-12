import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private email: string;
  private password: string;

  myStorage = window.localStorage; // nějaký shity aby fungoval local storage xd
  dataSource: any;



  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {

    if (localStorage.getItem("access-token")) {

      this.authenticationService.setToken(localStorage.getItem("access-token"))

      this.router.navigate(["/users"]) // díky tomuto se přemisťuju do jiných stránek

    } else {
      this.router.navigate(["/login"])
    }
  }

  login() {
    this.authenticationService.getLogin(this.email, this.password).subscribe(i => {
      this.router.navigate(['users/']);
    });
  }

  localStorage() { // local storage deklarace i guess xd

    localStorage.setItem('dataSource', this.dataSource.length);

    console.log(localStorage.getItem('dataSource'));
  }

}
