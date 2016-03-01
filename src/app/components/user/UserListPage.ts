import {Component, OnInit} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {UserService, HttpErrorHandler} from "app/services";
import {User} from "app/interfaces";
import {PrivatePage} from "app/routes";
import {Gravatar, Pager} from "app/components";

@Component({
  selector: 'user-list-page',
  styles: [require('./list.scss')],
  template: require('./list.html'),
  directives: [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
    Gravatar,
    Pager,
  ],
})
@PrivatePage()
export class UserListPage implements OnInit {

  users:User[];
  totalPages:number;

  constructor(private userService:UserService,
              private errorHandler:HttpErrorHandler) {
  }

  ngOnInit():any {
    this.list(1);
  }

  list(page) {
    this.userService.list({page: page, size: 5})
      .subscribe(usersPage => {
        this.users = usersPage.content;
        this.totalPages = usersPage.totalPages;
      }, e => this.errorHandler.handle(e))
    ;
  }

}
