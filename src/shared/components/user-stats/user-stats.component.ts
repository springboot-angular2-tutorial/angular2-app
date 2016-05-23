import {Component, OnChanges, Input} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {User} from "../../domains";
import {GravatarComponent} from "../../../shared/components";
import {HttpErrorHandler, UserService} from "../../services";
import {PluralizePipe} from "../../pipes";

@Component({
  selector: 'mpt-user-stats',
  styles: [require('./user-stats.scss')],
  template: require('./user-stats.html'),
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, GravatarComponent],
  pipes: [PluralizePipe],
})
export class UserStatsComponent implements OnChanges {

  @Input() userId:string;
  @Input() shownOnProfile:boolean = false;

  user:User;

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
