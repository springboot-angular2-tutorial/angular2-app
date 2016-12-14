import {Observable} from "rxjs/Observable";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {styles} from "./related-user-list.component.styles";
import {RelatedUser} from "../../core/domains";
import {UserService} from "../../core/services/user.service";
import {HttpErrorHandler} from "../../core/services/http-error-handler";

@Component({})
export abstract class RelatedUserListComponent implements OnInit {

  title: string;
  styles: any = styles;
  userId: string;
  relatedUsers: RelatedUser[] = [];
  noMoreUsers: boolean = false;

  constructor(protected userService: UserService,
              protected route: ActivatedRoute,
              protected errorHandler: HttpErrorHandler) {
  }

  ngOnInit(): any {
    this.route.params.subscribe(routeParams => {
      this.userId = routeParams['id'];
      this.list(null);
    });
  }

  loadMore() {
    const lastUser = this.relatedUsers[this.relatedUsers.length - 1];
    if (!lastUser) return false;
    this.list(lastUser.relationshipId);
  }

  protected abstract listProvider(maxId: number|null): Observable<RelatedUser[]>;

  private list(maxId: number|null): void {
    this.listProvider(maxId).subscribe(relatedUsers => {
      this.relatedUsers = this.relatedUsers.concat(relatedUsers);
      this.noMoreUsers = relatedUsers.length === 0;
    }, e => this.errorHandler.handle(e));
  }

}
