import {Component, OnInit} from '@angular/core';
import {rNames} from "../../../app-routing.module";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  protected readonly rNames = rNames;

  constructor(private htmlS: HtmlHeadOptionsService) {
  }

  ngOnInit(): void {
    this.htmlS.setCanonical(rNames.error404);
  }


}
