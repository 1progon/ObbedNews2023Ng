import {Component, OnInit} from '@angular/core';
import {News} from "../../../../interfaces/News";
import {AccountNewsService} from "../../../../services/account/account-news.service";
import {rNames} from "../../../../app-routing.module";

@Component({
  selector: 'app-account-news-favorites',
  templateUrl: './account-news-favorites.component.html',
  styleUrls: ['./account-news-favorites.component.scss']
})
export class AccountNewsFavoritesComponent implements OnInit {
  r = rNames;
  newsList: News[] = [];
  isLoading = false;

  constructor(private accountNewsService: AccountNewsService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.accountNewsService.getFavorites()
      .subscribe({
        next: value => {
          this.newsList = value;
        }
      })
      .add(() => this.isLoading = false)
  }

}
