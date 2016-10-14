import {Observable} from "rxjs/Observable";
import {Component, OnInit, Input} from "@angular/core";
import {RelatedUser} from "../../core/domains";
import {HttpErrorHandler} from "../../core/services/http-error-handler";

@Component({
  selector: 'mpt-related-user-list',
  styleUrls: ['related-user-list.component.css'],
  templateUrl: 'related-user-list.component.html',
})
export class RelatedUserListComponent implements OnInit {

  @Input() listProvider: (params: {maxId: number, count: number}) => Observable<RelatedUser[]>;

  users: RelatedUser[] = [];
  noMoreUsers: boolean = false;

  constructor(private errorHandler: HttpErrorHandler) {
  }

  ngOnInit(): any {
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
