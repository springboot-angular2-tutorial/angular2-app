import {Component, OnInit} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {
  MicropostListComponent,
  FollowBtnComponent,
  UserStatsComponent
} from "../../../shared/components";

@Component({
  selector: 'mpt-user-show',
  template: require('./user-show.html'),
  styles: [require('./user-show.scss')],
  directives: [CORE_DIRECTIVES, FollowBtnComponent, UserStatsComponent, MicropostListComponent],
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
