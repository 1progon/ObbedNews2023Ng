import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AdminNewsService} from "../../../../services/admin/admin-news.service";
import {rNames} from "../../../../app-routing.module";

@Component({
  selector: 'app-admin-news-remove',
  templateUrl: './admin-news-remove.component.html',
  styleUrls: ['./admin-news-remove.component.scss']
})
export class AdminNewsRemoveComponent implements OnInit {

  id?: number;
  isLoading = false;

  constructor(private route: ActivatedRoute,
              private adminNewsService: AdminNewsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe({
      next: (param) => {
        this.id = param['id'];


      }
    })
  }


  back() {
    history.back();
  }

  removeNews() {
    if (!this.id) return;

    this.isLoading = true;
    this.adminNewsService.removeNews(this.id)
      .subscribe({
        next: () => {
          const {admin, news} = rNames;
          this.router.navigate(['/', admin, news]).finally();
        },
        error: (err: HttpErrorResponse) => console.error(err)
      })
      .add(() => this.isLoading = false);
  }
}
