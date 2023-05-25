import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {LoginDto} from "../../../dto/users/LoginDto";
import {AuthService} from "../../../services/auth.service";
import {UserType} from "../../../enums/users/UserType";
import {rNames} from "../../../app-routing.module";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  form: LoginDto = {} as LoginDto;
  passMinLength = 5;
  error?: string;


  constructor(public auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.auth.isLogged()) {
      switch (this.auth.user?.userType) {
        case UserType.Undefined:
          this.auth.logoutWithRedirect();
          break;
        case UserType.Admin:
          this.router.navigate(['/', rNames.admin]).finally();
          break;
        default:
          this.router.navigate(['/', rNames.account]).finally();
          break;
      }

    }

  }

  onSubmit() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.error = undefined;

    setTimeout(() => {
      this.auth.login(this.form)
        .subscribe({
          next: () => {

            if (this.auth.isLogged()) {

              if (this.auth.returnUrl) {
                this.router
                  .navigateByUrl(this.auth.returnUrl)
                  .finally(() => this.auth.returnUrl = undefined);

                return;
              }

              this.router.navigate(['/', rNames.account]).finally();

            }

          },
          error: (err: HttpErrorResponse) => {
            if (err.status == HttpStatusCode.NotFound) {
              this.error = 'Пользователь не найден!'
            }

            if (err.status == HttpStatusCode.Unauthorized) {
              this.error = 'Проверьте пароль или Email для входа!'
            }

            console.log(err);
          }
        })
        .add(() => this.loading = false);
    }, 580)


  }


}
