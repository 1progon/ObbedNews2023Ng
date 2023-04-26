import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {RegisterDto} from "../../../../dto/users/RegisterDto";
import {UserType} from "../../../../enums/users/UserType";
import {rNames} from "../../../../app-routing.module";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: RegisterDto = {} as RegisterDto;
  isLoading = false;
  error?: string;
  isShowPassword = false;
  passMinLength: number = 5;


  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
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
    if (this.isLoading) {
      return;
    }

    this.error = undefined;
    this.isLoading = true;

    setTimeout(() => {
      this.auth.register(this.form)
        .subscribe({
          next: () => {

            if (this.auth.isLogged()) {

              if (this.auth.returnUrl) {
                this.router.navigateByUrl(this.auth.returnUrl)
                  .finally(() => this.auth.returnUrl = undefined);
                return;
              }

              this.router.navigate(['/', rNames.account]).finally();
            }

          },
          error: (err: HttpErrorResponse) => {
            if (err.status == HttpStatusCode.Conflict) {
              this.error = 'Пользователь уже существует!';
            }
            if (err.status == HttpStatusCode.BadRequest) {
              this.error = 'Проверьте пароли и минимальную длину'
            }

          }
        })
        .add(() => this.isLoading = false);
    }, 580)


  }


}
