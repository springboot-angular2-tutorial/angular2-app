import {Component, OnChanges, EventEmitter, Output, Input} from "@angular/core";
import {User} from "../../domains";
import {FollowBtnService} from "./follow-btn.service";
import {HttpErrorHandler, UserService} from "../../services";

@Component({
  selector: 'mpt-follow-btn',
  templateUrl: './follow-btn.html',
  providers: [FollowBtnService]
})
export class FollowBtnComponent implements OnChanges {

  @Input() followerId:string;
  @Output() updated = new EventEmitter();

  canShowFollowBtn:boolean;
  canShowUnfollowBtn:boolean;
  busy:boolean = false;

  constructor(private followBtnService:FollowBtnService,
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
    this.followBtnService.follow(this.followerId)
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
    this.followBtnService.unfollow(this.followerId)
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
        this.canShowFollowBtn = this._canShowFollowBtn(<User>user);
        this.canShowUnfollowBtn = this._canShowUnfollowBtn(<User>user);
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
