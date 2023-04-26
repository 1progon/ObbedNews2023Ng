import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {HomepageDto} from "../../../../dto/homepage/HomepageDto";
import {rNames} from "../../../../app-routing.module";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  dto?: HomepageDto;
  isLoading: boolean = false;
  imagesPath: string = environment.imagesPath;
  r = rNames;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    if (!this.dto) {
      this.isLoading = true;
      this.http.get<HomepageDto>(environment.apiBase + '/Homepage')
        .subscribe({
          next: value => {
            this.dto = value;
          }
        })
        .add(() => this.isLoading = false)
    }

  }


}
