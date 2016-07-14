import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {
  MicropostListComponent,
  FollowBtnComponent,
  UserStatsComponent
} from "../../../shared/components";

@Component({
  selector: 'mpt-user-show',
  styleUrls: ['./user-show.scss'],
  templateUrl: './user-show.html',
  directives: [FollowBtnComponent, UserStatsComponent, MicropostListComponent],
})
export class UserShowComponent implements OnInit {

  userId:string;

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit():any {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }

}
