import {Component, EventEmitter, Output} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FeedService} from "./feed.service";
import {Micropost} from "../../../shared/domains";
import {GravatarComponent} from "../../../shared/components";
import {HttpErrorHandler, MicropostService} from "../../../shared/services";
import {TimeAgoPipe} from "../../../shared/pipes";

@Component({
  selector: 'mpt-feed',
  styleUrls: ['./feed.scss'],
  templateUrl: './feed.html',
  directives: [ROUTER_DIRECTIVES, GravatarComponent],
  pipes: [TimeAgoPipe],
  providers: [FeedService],
})
export class FeedComponent {

  feed:Micropost[];

  @Output() deleted = new EventEmitter();

  constructor(private micropostService:MicropostService,
              private feedService:FeedService,
              private errorHandler:HttpErrorHandler) {
    this.list();
  }

  list():void {
    this.feedService.showFeed()
      .subscribe(feed => this.feed = feed,
        e => this.errorHandler.handle(e))
    ;
  }

  delete(id:number) {
    if (!window.confirm('Are you sure?')) return;
    this.micropostService.delete(id)
      .subscribe(() => {
        this.list();
        this.deleted.emit({});
      }, e => this.errorHandler.handle(e))
    ;
  }

}
