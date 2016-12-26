import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {styles} from "./related-user-list.component.styles";
import {RelatedUser} from "../../core/domains";
import {HttpErrorHandler} from "../../core/services/http-error-handler";
import {RelatedUserListService} from "./related-user-list.service";

@Component({
  selector: 'mpt-related-user-list',
  templateUrl: 'related-user-list.component.html',
})
export class RelatedUserListComponent implements OnInit {

  title: string;
  styles: any = styles;
  userId: string;
  relatedUsers: RelatedUser[] = [];
  noMoreUsers: boolean = false;

  constructor(private route: ActivatedRoute,
              private errorHandler: HttpErrorHandler,
              private relatedUserListService: RelatedUserListService) {
  }

  ngOnInit(): any {
    this.route.params.subscribe(routeParams => {
      this.userId = routeParams['id'];
      this.list(null);
    });
    this.title = this.relatedUserListService.title();
  }

  loadMore() {
    const lastUser = this.relatedUsers[this.relatedUsers.length - 1];
    if (!lastUser) return false;
    this.list(lastUser.relationshipId);
  }

  private list(maxId: number|null): void {
    this.relatedUserListService.list(this.userId, {
      maxId: maxId,
      count: 5
    }).subscribe(relatedUsers => {
      this.relatedUsers = [...this.relatedUsers, ...relatedUsers];
      this.noMoreUsers = relatedUsers.length === 0;
    }, e => this.errorHandler.handle(e));
  }

}
