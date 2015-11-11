import {
  Component,
  View,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES
} from 'angular2/angular2';

import {pagination} from 'ng2-bootstrap/components/pagination/pagination';

import {
  UserMicropostService,
  MicropostService,
  LoginService,
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
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, pagination],
  pipes: [TimeAgoPipe],
})
export class MicropostList {

  userId:string;
  posts:Micropost[];

  currentPage:number;
  totalItems:number;
  itemsPerPage:number = 5;
  totalPages:number;

  constructor(private userMicropostService:UserMicropostService,
              private micropostService:MicropostService,
              private loginService:LoginService,
              private errorHandler:ErrorHandler) {
  }

  list():void {
    this.userMicropostService.list(this.userId, {
        page: this.currentPage,
        size: this.itemsPerPage
      })
      .subscribe((micropostPage) => {
        this.posts = micropostPage.content;
        this.totalItems = micropostPage.totalElements;
        this.totalPages = micropostPage.totalPages;
      }, e => this.errorHandler.handle(e))
    ;
  }

  pageChanged(event) {
    if (event.page == this.currentPage) return;
    this.currentPage = event.page;
    this.list();
  }

  delete(postId:number) {
    if (!window.confirm('Are you sure?')) return;
    this.micropostService.delete(postId)
      .subscribe(() => this.list(),
        e => this.errorHandler.handle(e))
    ;
  }

  isMyPost(post:Micropost):boolean {
    return post.user.id == this.loginService.currentUser().id
  }

}
