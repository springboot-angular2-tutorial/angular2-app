import {Component, EventEmitter, Output} from "@angular/core";
import {FeedService} from "./feed.service";
import {Micropost} from "../../../shared/domains";
import {MicropostService} from "../../core/services/micropost.service";
import {HttpErrorHandler} from "../../core/services/http-error-handler";

@Component({
  selector: 'mpt-feed',
  styleUrls: ['./feed.scss'],
  templateUrl: './feed.html',
  providers: [FeedService],
})
export class FeedComponent {

  feed: Micropost[];

  @Output() deleted = new EventEmitter();

  constructor(private micropostService: MicropostService,
              private feedService: FeedService,
              private errorHandler: HttpErrorHandler) {
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
