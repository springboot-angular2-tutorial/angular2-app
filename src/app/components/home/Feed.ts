import {Component, EventEmitter} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {MicropostService, FeedService, HttpErrorHandler} from "app/services";
import {Micropost} from "app/interfaces";
import {TimeAgoPipe} from "app/pipes";
import {Gravatar} from "app/components";

@Component({
  selector: 'feed',
  events: ['deleted'],
  styles: [require('./feed.scss')],
  template: require('./feed.html'),
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, Gravatar],
  pipes: [TimeAgoPipe],
})
export class Feed {

  feed:Micropost[];
  deleted:EventEmitter<any> = new EventEmitter();

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

