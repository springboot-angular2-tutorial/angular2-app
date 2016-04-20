import {Component, OnChanges, EventEmitter} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {RelationshipService, HttpErrorHandler, UserService} from "app/services";
import {User} from "app/interfaces";

@Component({
  selector: 'follow-btn',
  properties: ['followerId'],
  events: ['updated'],
  template: require('./follow-btn.html'),
  directives: CORE_DIRECTIVES,
})
export class FollowBtn implements OnChanges {

  canShowFollowBtn:boolean;
  canShowUnfollowBtn:boolean;

  followerId:string;
  busy:boolean = false;

  private updated:EventEmitter<any> = new EventEmitter();

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
        this.canShowFollowBtn = !this.canShowFollowBtn;
        this.canShowUnfollowBtn = !this.canShowUnfollowBtn;
        this.updated.emit({});
      }, e => this.errorHandler.handle(e))
    ;
  }

  unfollow() {
    this.busy = true;
    this.relationshipService.unfollow(this.followerId)
      .finally(() => this.busy = false)
      .subscribe(() => {
        this.canShowFollowBtn = !this.canShowFollowBtn;
        this.canShowUnfollowBtn = !this.canShowUnfollowBtn;
        this.updated.emit({});
      }, e => this.errorHandler.handle(e))
    ;
  }

  loadCurrentStatus():void {
    this.busy = true;
    this.userService.get(this.followerId)
      .finally(() => this.busy = false)
      .subscribe(user => {
        this.canShowFollowBtn = this._canShowFollowBtn(user);
        this.canShowUnfollowBtn = this._canShowUnfollowBtn(user);
      }, e => this.errorHandler.handle(e))
    ;
  }

  private _canShowFollowBtn(user:User):boolean {
    if (user.isMyself === null) return false; // not signed in
    if (user.isMyself === true) return false; // myself
    if (user.userStats.followedByMe === true) return false; // already followed
    return true;
  }

  private _canShowUnfollowBtn(user:User):boolean {
    if (user.isMyself === null) return false; // not signed in
    if (user.isMyself === true) return false; // myself
    if (user.userStats.followedByMe === false) return false; // not followed yet
    return true;
  }
}
