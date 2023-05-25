import {Component} from '@angular/core';
import {rNames} from "../../../app/app-routing.module";
import {AuthService} from "../../../app/services/auth.service";

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
