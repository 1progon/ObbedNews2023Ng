import {Component} from '@angular/core';

export interface UserReportDto {
  title: string;
  message: string;
}

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent {

  reportForm = <UserReportDto>{};

  onSubmit() {
  }
}
