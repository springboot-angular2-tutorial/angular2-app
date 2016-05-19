import {Component} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {RouteParams} from "@angular/router-deprecated";
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
export class UserShowComponent {

  userId:string;

  constructor(private params:RouteParams) {
    this.userId = params.get('id');
  }

}
