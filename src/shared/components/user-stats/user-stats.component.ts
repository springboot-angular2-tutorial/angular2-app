import {Component, OnChanges} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {User} from "../../domains";
import {GravatarComponent} from "../../../shared/components";
import {HttpErrorHandler, UserService} from "../../services";
import {PluralizePipe} from "../../pipes";

@Component({
  selector: 'mpt-user-stats',
  properties: ['userId', 'shownOnProfile'],
  styles: [require('./user-stats.scss')],
  template: require('./user-stats.html'),
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, GravatarComponent],
  pipes: [PluralizePipe],
})
export class UserStatsComponent implements OnChanges {

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
