import {Component, View, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {
  UserMicropostService,
  MicropostService,
  HttpErrorHandler
} from 'app/services';
import {Micropost} from 'app/interfaces';
import {TimeAgoPipe} from 'app/pipes';

@Component({
  selector: 'micropost-list',
  properties: ['userId'],
})
@View({
  styles: [require('./list.scss')],
  template: require('./list.html'),
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [TimeAgoPipe],
})
export class MicropostList implements OnInit {

  userId:string;
  posts:Micropost[] = [];
  noMorePosts:boolean = false;

  constructor(private userMicropostService:UserMicropostService,
              private micropostService:MicropostService,
              private errorHandler:HttpErrorHandler) {
  }

  ngOnInit():any {
    this.list();
  }

  list(maxId:number = null):void {
    this.userMicropostService.list(this.userId, {maxId: maxId, count: 5})
      .subscribe(posts => {
        this.posts = this.posts.concat(posts);
        this.noMorePosts = posts.length == 0;
      }, e => this.errorHandler.handle(e))
    ;
  }

  delete(postId:number) {
    if (!window.confirm('Are you sure?')) return;
    this.micropostService.delete(postId)
      .subscribe(() => {
        }, e => this.errorHandler.handle(e),
        () => this.posts = this.posts.filter(p => p.id != postId)
      )
    ;
  }

  isMyPost(post:Micropost):boolean {
    return this.micropostService.isMyPost(post);
  }

  loadMore() {
    const lastPost = this.posts[this.posts.length - 1];
    if (!lastPost) return false;
    this.list(lastPost.id);
  }

}
