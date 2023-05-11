import {Component, OnInit} from '@angular/core';
import {WordWrapperService} from "../word-wrapper.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {rNames} from "../../../../app-routing.module";
import {SafeResourceUrl} from "@angular/platform-browser";
import {environment} from "../../../../../environments/environment";
import {Word} from "../../../../interfaces/words/Word";
import {WordVideoSection} from "../../../../interfaces/words/WordVideoSection";
import {WordVideo} from "../../../../interfaces/words/WordVideo";

@Component({
  selector: 'app-news-episode',
  templateUrl: './word-episode.component.html',
  styleUrls: ['./word-episode.component.scss']
})
export class WordEpisodeComponent implements OnInit {

  r = rNames;
  news?: Word;
  episode?: WordVideo;
  sections: WordVideoSection[] = [];

  blobUrl?: SafeResourceUrl;

  videoServer = environment.videoServer;
  // todo need to check User premium access on backend before load
  videoLoaded: boolean = false;
  isShowedMobileMenu: boolean = false;

  constructor(public wrapperService: WordWrapperService,
              public route: ActivatedRoute,
              public auth: AuthService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.scrollToActiveVideoLink();

    this.route.params.subscribe({
      next: params => {

        this.videoLoaded = false;

        this.wrapperService.word$.subscribe({
          next: value => {
            this.sections = value.videoSections;
            this.news = value;

            let episode = value.videoSections
              ?.map(s => {
                  let v = s.videos
                    .find(video => video.sortNumber == params['episode']);
                  if (v) {
                    v.section = s;
                  }
                  return v;
                }
              )
              .filter(video => video != undefined)[0];

            if (episode) {
              this.episode = episode;
              if (this.episode) {
                this.wrapperService.expandedSections[this.episode.section.id] = true;
              }

              this.scrollToActiveVideoLink();

            }
          }
        })
      }
    })

  }

  showMobile() {
    this.isShowedMobileMenu = !this.isShowedMobileMenu;

    if (this.isShowedMobileMenu) {
      this.scrollToActiveVideoLink();
    }

  }

  private scrollToActiveVideoLink() {

    setTimeout(() => {
      let link = document.getElementById('video-link_' + this.episode?.id);
      if (link) {
        link?.scrollIntoView({block: 'center'});
      }
    }, 0)

  }
}
