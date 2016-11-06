import {Component, EventEmitter, Output, OnInit} from "@angular/core";
import {FeedService} from "./feed.service";
import {Micropost} from "../../../core/domains";
import {MicropostService} from "../../../core/services/micropost.service";
import {HttpErrorHandler} from "../../../core/services/http-error-handler";
import {styles} from "./feed.component.styles";

@Component({
  selector: 'mpt-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {

  styles: any = styles;
  feed: Micropost[];

  @Output() deleted = new EventEmitter();

  constructor(private micropostService: MicropostService,
              private feedService: FeedService,
              private errorHandler: HttpErrorHandler) {
  }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.feedService.showFeed()
      .subscribe(feed => this.feed = feed,
        e => this.errorHandler.handle(e))
    ;
  }

  delete(id: number) {
    if (!window.confirm('Are you sure?')) return;
    this.micropostService.delete(id)
      .subscribe(() => {
        this.list();
        this.deleted.emit({});
      }, e => this.errorHandler.handle(e))
    ;
  }

}

