import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PublicUserDto} from "../../../../dto/users/PublicUserDto";
import {rNames} from "../../../../app-routing.module";

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss']
})
export class UserSingleComponent implements OnInit {
  r = rNames;

  user?: PublicUserDto;
  userId?: number;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe({
        next: value => {
          this.userId = value['id'];

          // todo implement get public user from backend
          this.user = {} as PublicUserDto;
        }
      })

  }

}
