import {Component, OnInit} from '@angular/core';
import {rNames} from "../../../../app/app-routing.module";
import {Word} from "../../../../app/interfaces/words/Word";
import {AccountWordsService} from "../../../services/account-words.service";

@Component({
  selector: 'app-account-news-favorites',
  templateUrl: './account-news-favorites.component.html',
  styleUrls: ['./account-news-favorites.component.scss']
})
export class AccountNewsFavoritesComponent implements OnInit {
  r = rNames;
  newsList: Word[] = [];
  isLoading = false;

  constructor(private accountNewsService: AccountWordsService) {
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
