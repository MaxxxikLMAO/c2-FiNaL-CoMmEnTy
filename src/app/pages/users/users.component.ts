import { Component, OnInit } from '@angular/core';
import {User} from '../../services/models/user.interface';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(i => this.users = i.users);
  }

}
