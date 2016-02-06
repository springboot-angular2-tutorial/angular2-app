import {Component, View, OnChanges} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {
  RelationshipService,
  HttpErrorHandler,
  UserService,
} from 'app/services';

@Component({
  selector: 'follow-btn',
  properties: ['followerId'],
})
@View({
  template: require('./follow-btn.html'),
  directives: CORE_DIRECTIVES,
})
export class FollowBtn implements OnChanges {

  isFollowedByMe:boolean;
  followerId:string;
  busy:boolean = false;

  constructor(private relationshipService:RelationshipService,
              private userService:UserService,
              private errorHandler:HttpErrorHandler) {
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
        this.isFollowedByMe = true;
      }, e => this.errorHandler.handle(e))
    ;
  }

  unfollow() {
    this.busy = true;
    this.relationshipService.unfollow(this.followerId)
      .finally(() => this.busy = false)
      .subscribe(() => {
        this.isFollowedByMe = false;
      }, e => this.errorHandler.handle(e))
    ;
  }

  loadCurrentStatus():void {
    this.busy = true;
    this.userService.get(this.followerId)
      .map(user =>  user.userStats.followedByMe)
      .finally(() => this.busy = false)
      .subscribe(followedByMe => {
        this.isFollowedByMe = followedByMe;
      }, e => this.errorHandler.handle(e))
    ;
  }
}
