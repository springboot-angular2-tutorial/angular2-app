import {Component, OnInit, Input} from "@angular/core";
import {Micropost, UserStats} from "../../domains";
import {HttpErrorHandler, MicropostService, UserService} from "../../services";
import {MicropostListService} from "./micropost-list.service";
import {TimeAgoPipe} from "../../pipes";

@Component({
  selector: 'mpt-micropost-list',
  styleUrls: ['./micropost-list.scss'],
  templateUrl: './micropost-list.html',
  pipes: [TimeAgoPipe],
  providers: [MicropostListService],
})
export class MicropostListComponent implements OnInit {

  @Input() userId:string;

  posts:Micropost[] = [];
  noMorePosts:boolean = false;
  userStats:UserStats;

  constructor(private userMicropostService:MicropostListService,
              private micropostService:MicropostService,
              private userService:UserService,
              private errorHandler:HttpErrorHandler) {
  }

  ngOnInit():any {
    this.list();
    this.loadUserStats();
  }

  delete(postId:number) {
    if (!window.confirm('Are you sure?')) return;
    this.micropostService.delete(postId)
      .subscribe(() => {
        }, e => this.errorHandler.handle(e),
        () => this.posts = this.posts.filter(p => p.id !== postId)
      )
    ;
  }

  loadMore() {
    const lastPost = this.posts[this.posts.length - 1];
    if (!lastPost) return false;
    this.list(lastPost.id);
  }

  private list(maxId:number = null):void {
    this.userMicropostService.list(this.userId, {maxId: maxId, count: 5})
      .subscribe(posts => {
        this.posts = this.posts.concat(posts);
        this.noMorePosts = posts.length === 0;
      }, e => this.errorHandler.handle(e))
    ;
  }

  private loadUserStats() {
    this.userService.get(this.userId)
      .subscribe(resp => {
        this.userStats = resp.userStats;
      }, e => this.errorHandler.handle(e))
    ;
  }

}
