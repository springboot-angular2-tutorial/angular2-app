import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {RouteParams} from "angular2/router";
import {FollowBtn, UserStats, MicropostList} from "app/components";

@Component({
  selector: 'user-show-page',
  template: require('./show.html'),
  styles: [require('./show.scss')],
  directives: [CORE_DIRECTIVES, FollowBtn, UserStats, MicropostList],
})
export class UserShowPage {

  userId:string;

  constructor(private params:RouteParams) {
    this.userId = params.get('id');
  }

}
