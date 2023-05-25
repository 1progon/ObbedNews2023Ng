import {Component, OnInit} from '@angular/core';
import {User} from "../../../../app/interfaces/User";
import {rNames} from "../../../../app/app-routing.module";
import {OrderStatus} from "../../../../app/enums/payments/OrderStatus";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-admin-users-index',
  templateUrl: './admin-users-index.component.html',
  styleUrls: ['./admin-users-index.component.scss']
})
export class AdminUsersIndexComponent implements OnInit {
  users: User[] = [];
  loading = false;

  protected readonly rNames = rNames;
  protected readonly OrderStatus = OrderStatus;

  constructor(private userService: UsersService) {
  }

  ngOnInit() {

    this.loading = true;

    this.userService.getUsers()
      .subscribe({
        next: users => {
          this.users = users;
        },
        error: err => console.error(err)
      })
      .add(() => this.loading = false)

  }


}
