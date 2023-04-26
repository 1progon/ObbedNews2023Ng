import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {rNames} from "../../../app-routing.module";

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss']
})
export class AccountDashboardComponent {
  r = rNames;

  constructor(public auth: AuthService) {
  }

}
