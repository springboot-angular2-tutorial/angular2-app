import {Observable} from "rxjs/Observable";
import {Component, OnInit, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {RelatedUser} from "../../../shared/domains";
import {GravatarComponent, PagerComponent} from "../../../shared/components";
import {HttpErrorHandler} from "../../../shared/services";

@Component({
  selector: 'mpt-related-user-list',
  styleUrls: ['./related-user-list.scss'],
  templateUrl: './related-user-list.html',
  directives: [
    ROUTER_DIRECTIVES,
    GravatarComponent,
    PagerComponent,
  ],
})
export class RelatedUserListComponent implements OnInit {

  @Input() listProvider:(params:{maxId:number, count:number}) => Observable<RelatedUser[]>;

  users:RelatedUser[] = [];
  noMoreUsers:boolean = false;

  constructor(private errorHandler:HttpErrorHandler) {
  }

  ngOnInit():any {
    this.list();
  }

  loadMore() {
    const lastUser = this.users[this.users.length - 1];
    if (!lastUser) return false;
    this.list(lastUser.relationshipId);
  }

  private list(maxId = null) {
    this.listProvider({maxId: maxId, count: 5})
      .subscribe(users => {
          this.users = this.users.concat(users);
          this.noMoreUsers = users.length === 0;
        }, e => this.errorHandler.handle(e)
      )
    ;
  }

}
