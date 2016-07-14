import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../shared/domains";
import {GravatarComponent, PagerComponent} from "../../../shared/components";
import {HttpErrorHandler, UserService} from "../../../shared/services";

@Component({
  selector: 'mpt-user-list',
  styleUrls: ['./user-list.scss'],
  templateUrl: './user-list.html',
  directives: [
    ROUTER_DIRECTIVES,
    GravatarComponent,
    PagerComponent,
  ],
})
export class UserListComponent implements OnInit {

  users:User[];
  totalPages:number;
  page:number;

  constructor(private userService:UserService,
              private errorHandler:HttpErrorHandler,
              private route:ActivatedRoute,
              private router:Router) {
  }

  ngOnInit():any {
    this.route.params.subscribe(params => {
      this.page = +(params['page'] || 1);
      this.list(this.page);
    });
  }

  onPageChanged(page) {
    this.router.navigate(['/users', {page: page}]);
  }

  private list(page) {
    this.userService.list({page: page, size: 5})
      .subscribe(usersPage => {
        this.users = usersPage.content;
        this.totalPages = usersPage.totalPages;
      }, e => this.errorHandler.handle(e))
    ;
  }

}
