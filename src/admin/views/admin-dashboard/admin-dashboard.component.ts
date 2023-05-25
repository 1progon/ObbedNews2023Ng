import {Component} from '@angular/core';
import {rNames} from "../../../app/app-routing.module";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  r = rNames;

}
