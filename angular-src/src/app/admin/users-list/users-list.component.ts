import {  UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService : UserService) { }

  users : any [];

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any[]) => this.users = users ,
        err => console.log(`Error  ${err}`));
  }


  deleteUser(id : string) {
    if(confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id)
      .subscribe(user => {
        console.log("User deleted ! ",user);
        this.ngOnInit();
      }, err => console.log("Err ",err));
  }}

}
