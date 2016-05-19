import {Component, OnInit} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "@angular/common";
import {
  ROUTER_DIRECTIVES,
  CanActivate,
  RouteParams,
  Router
} from "@angular/router-deprecated";
import {User} from "../../../shared/domains";
import {GravatarComponent, PagerComponent} from "../../../shared/components";
import {HttpErrorHandler, UserService} from "../../../shared/services";
import {activateIfSignedIn} from "../../../shared/routes";

@Component({
  selector: 'mpt-user-list',
  styles: [require('./user-list.scss')],
  template: require('./user-list.html'),
  directives: [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
    GravatarComponent,
    PagerComponent,
  ],
})
@CanActivate(() => activateIfSignedIn())
export class UserListComponent implements OnInit {

  users:User[];
  totalPages:number;
  page:number;

  constructor(private userService:UserService,
              private errorHandler:HttpErrorHandler,
              private params:RouteParams,
              private router:Router) {
    this.page = <any>params.get('page') || 1;
  }

  ngOnInit():any {
    this.list(this.page);
  }

  onPageChanged(page) {
    this.router.navigate(['/UserList', {page: page}]);
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
