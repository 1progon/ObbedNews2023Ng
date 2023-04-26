import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {UserType} from "../../../../enums/users/UserType";
import {rNames} from "../../../../app-routing.module";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  UserType = UserType;
  r = rNames;

  constructor(public authService: AuthService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe({
      next: value => {
        if (value instanceof NavigationEnd) {
          if (!value.url.match(rNames.login)
            && !value.url.match(rNames.register)) {
            this.authService.returnUrl = value.url;
          }
        }

      }
    })

  }


}
