import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AdminWordService} from "../../../services/admin-word.service";
import {rNames} from "../../../../app/app-routing.module";

@Component({
  selector: 'app-admin-word-remove',
  templateUrl: './admin-word-remove.component.html',
  styleUrls: ['./admin-word-remove.component.scss']
})
export class AdminWordRemoveComponent implements OnInit {

  id?: number;
  loading = false;

  constructor(private route: ActivatedRoute,
              private adminNewsService: AdminWordService,
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

    this.loading = true;
    this.adminNewsService.removeWord(this.id)
      .subscribe({
        next: () => {
          const {admin, dictionary} = rNames;
          this.router.navigate(['/', admin, dictionary]).finally();
        },
        error: (err: HttpErrorResponse) => console.error(err)
      })
      .add(() => this.loading = false);
  }
}
