import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../core/domains";
import {UserService} from "../../../core/services/user.service";
import {HttpErrorHandler} from "../../../core/services/http-error-handler";

@Component({
  selector: 'mpt-user-list',
  styleUrls: ['./user-list.css'],
  templateUrl: './user-list.html',
})
export class UserListComponent implements OnInit {

  users: User[];
  totalPages: number;
  page: number;

  constructor(private userService: UserService,
              private errorHandler: HttpErrorHandler,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.page = +(params['page'] || 1);
      this.list(this.page);
    });
  }

  onPageChanged(page: number) {
    this.router.navigate(['/users', {page: page}]);
  }

  private list(page: number) {
    this.userService.list({page: page, size: 5})
      .subscribe(usersPage => {
        this.users = usersPage.content;
        this.totalPages = usersPage.totalPages;
      }, e => this.errorHandler.handle(e))
    ;
  }

}
