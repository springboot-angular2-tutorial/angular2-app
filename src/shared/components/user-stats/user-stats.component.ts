import {Component, OnInit, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {User} from "../../domains";
import {GravatarComponent} from "../../../shared/components";
import {HttpErrorHandler, UserService} from "../../services";
import {PluralizePipe} from "../../pipes";

@Component({
  selector: 'mpt-user-stats',
  styleUrls: ['./user-stats.scss'],
  templateUrl: './user-stats.html',
  directives: [ROUTER_DIRECTIVES, GravatarComponent],
  pipes: [PluralizePipe],
})
export class UserStatsComponent implements OnInit {

  @Input() userId:string;
  @Input() shownOnProfile:boolean = false;

  user:User;

  constructor(private userService:UserService,
              private errorHandler:HttpErrorHandler) {
  }

  ngOnInit():any {
    this.userService.get(this.userId)
      .subscribe(user => this.user = user,
        e => this.errorHandler.handle(e)
      );
  }

}
