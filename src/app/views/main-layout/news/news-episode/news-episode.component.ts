import {Component, OnInit} from '@angular/core';
import {NewsVideo} from "../../../../interfaces/NewsVideo";
import {NewsWrapperService} from "../news-wrapper.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsVideoSection} from "../../../../interfaces/NewsVideoSection";
import {AuthService} from "../../../../services/auth.service";
import {rNames} from "../../../../app-routing.module";
import {News} from "../../../../interfaces/News";
import {SafeResourceUrl} from "@angular/platform-browser";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-news-episode',
  templateUrl: './news-episode.component.html',
  styleUrls: ['./news-episode.component.scss']
})
export class NewsEpisodeComponent implements OnInit {

  r = rNames;
  news?: News;
  episode?: NewsVideo;
  sections: NewsVideoSection[] = [];

  blobUrl?: SafeResourceUrl;

  videoServer = environment.videoServer;
  // todo need to check User premium access on backend before load
  videoLoaded: boolean = false;
  isShowedMobileMenu: boolean = false;

  constructor(public wrapperService: NewsWrapperService,
              public route: ActivatedRoute,
              public auth: AuthService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.scrollToActiveVideoLink();

    this.route.params.subscribe({
      next: params => {

        this.videoLoaded = false;

        this.wrapperService.news$.subscribe({
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

              this.wrapperService.expandedSections[this.episode.section.id] = true;
              this.scrollToActiveVideoLink();


              // todo test only. remove for prod
              // let path = environment.apiBase + '/videos/' + this.episode.filePath;
              // path = 'https://nanotravel.ru/videos/one.mp4';
              // console.log(path)
              // fetch(new URL(path),
              //   {
              //   })
              //   .then(res => res.blob())
              //   .then(data => {
              //     console.log(data)
              //     this.blobUrl = this.san.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
              //   })

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
