import {Component, OnInit, Input} from "@angular/core";
import {UserService} from "../../../app/core/services/user.service";
import {HttpErrorHandler} from "../../../app/core/services/http-error-handler";
import {User} from "../../../shared/domains";

@Component({
  selector: 'mpt-user-stats',
  styleUrls: ['./user-stats.scss'],
  templateUrl: './user-stats.html',
})
export class UserStatsComponent implements OnInit {

  @Input() userId: string;
  @Input() shownOnProfile: boolean = false;

  user: User;

  constructor(private userService: UserService,
              private errorHandler: HttpErrorHandler) {
  }

  ngOnInit(): any {
    this.userService.get(this.userId)
      .subscribe(user => this.user = user,
        e => this.errorHandler.handle(e)
      );
  }

}
