import {Component, View, CORE_DIRECTIVES, OnChanges} from 'angular2/angular2';

import {RelationshipService, ErrorHandler, LoginService} from 'app/services';

@Component({
  selector: 'follow-btn',
  properties: ['followerId'],
})
@View({
  template: require('./follow-btn.html'),
  directives: CORE_DIRECTIVES,
})
export class FollowBtn implements OnChanges {

  isFollowing:boolean;
  followerId:string;
  busy:boolean = false;

  constructor(private relationshipService:RelationshipService,
              private errorHandler:ErrorHandler) {
  }

  ngOnChanges():void {
    if (this.followerId) {
      this.loadCurrentStatus();
    }
  }

  follow() {
    this.busy = true;
    this.relationshipService.follow(this.followerId)
      .finally(() => this.busy = false)
      .subscribe(() => {
        this.isFollowing = true;
      }, e => this.errorHandler.handle(e))
    ;
  }

  unfollow() {
    this.busy = true;
    this.relationshipService.unfollow(this.followerId)
      .finally(() => this.busy = false)
      .subscribe(() => {
        this.isFollowing = false;
      }, e => this.errorHandler.handle(e))
    ;
  }

  loadCurrentStatus():void {
    this.busy = true;
    this.relationshipService.isFollowing(this.followerId)
      .finally(() => this.busy = false)
      .subscribe(isFollowing => {
        this.isFollowing = isFollowing;
      }, e => this.errorHandler.handle(e))
    ;
  }
}
