import {
  Component,
  View,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  OnInit,
} from 'angular2/angular2';

import {Pager} from 'app/components';
import {
  UserMicropostService,
  MicropostService,
  ErrorHandler
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
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, Pager],
  pipes: [TimeAgoPipe],
})
export class MicropostList implements OnInit {

  userId:string;
  posts:Micropost[];

  totalPages:number;
  totalItems:number;
  currentPage:number;

  constructor(private userMicropostService:UserMicropostService,
              private micropostService:MicropostService,
              private errorHandler:ErrorHandler) {
  }

  ngOnInit():any {
    this.list(1);
  }

  list(page):void {
    this.userMicropostService.list(this.userId, {page: page, size: 5})
      .subscribe((micropostPage) => {
        this.posts = micropostPage.content;
        this.currentPage = page;
        this.totalItems = micropostPage.totalElements;
        this.totalPages = micropostPage.totalPages;
      }, e => this.errorHandler.handle(e))
    ;
  }

  delete(postId:number) {
    if (!window.confirm('Are you sure?')) return;
    this.micropostService.delete(postId)
      .subscribe(() => this.list(this.currentPage),
        e => this.errorHandler.handle(e))
    ;
  }

  isMyPost(post:Micropost):boolean {
    return this.micropostService.isMyPost(post);
  }

}
