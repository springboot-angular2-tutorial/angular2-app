import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {pagination} from 'ng2-bootstrap/components/pagination/pagination';

import {UserService, ErrorHandler, LoginService} from 'app/services';
import {User} from 'app/interfaces';
import {PrivatePage} from 'app/routes'
import {Gravatar} from "app/components";

@Component({
  selector: 'user-list-page',
})
@View({
  styles: [require('./list.scss')],
  template: require('./list.html'),
  directives: [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
    Gravatar,
    pagination
  ],
})
@PrivatePage()
export class UserListPage {

  users:User[];
  currentPage:number;
  totalItems:number;
  itemsPerPage:number = 5;
  totalPages:number = 0;

  constructor(private userService:UserService,
              private errorHandler:ErrorHandler) {
  }

  list() {
    this.userService.list({page: this.currentPage, size: this.itemsPerPage})
      .subscribe(usersPage => {
        this.users = usersPage.content;
        this.totalItems = usersPage.totalElements;
        this.totalPages = usersPage.totalPages;
      }, e => this.errorHandler.handle(e))
    ;
  }

  pageChanged(event) {
    if (event.page == this.currentPage) return;
    this.currentPage = event.page;
    this.list();
  }
}
