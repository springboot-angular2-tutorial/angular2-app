import {Component, OnChanges} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {User} from "app/interfaces";
import {UserService, HttpErrorHandler} from "app/services";
import {PluralizePipe} from "app/pipes";
import {Gravatar} from "app/components";

@Component({
  selector: 'user-stats',
  properties: ['userId', 'shownOnProfile'],
  styles: [require('./user-stats.scss')],
  template: require('./user-stats.html'),
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, Gravatar],
  pipes: [PluralizePipe],
})
export class UserStats implements OnChanges {

  userId:string;
  user:User;

  shownOnProfile:boolean = false;

  constructor(private userService:UserService,
              private errorHandler:HttpErrorHandler) {
  }

  ngOnChanges():void {
    if (!this.userId) return;
    this.loadUser();
  }

  private loadUser() {
    this.userService.get(this.userId)
      .subscribe(user => this.user = user,
        e => this.errorHandler.handle(e)
      )
    ;
  }

}
