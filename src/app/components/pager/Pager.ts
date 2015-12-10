import {
  Component,
  View,
  CORE_DIRECTIVES,
  EventEmitter,
} from 'angular2/angular2';

@Component({
  selector: 'pager',
  properties: ['totalPages'],
  events: ['pageChanged'],
})
@View({
  template: require('./pager.html'),
  directives: [CORE_DIRECTIVES],
})
export class Pager {

  currentPage:number = 1;
  totalPages:number;
  pageChanged:EventEmitter<any> = new EventEmitter();

  showPrev() {
    if (this.currentPage == 1) return;
    this.currentPage -= 1;
    this.pageChanged.emit({page: this.currentPage});
  }

  showNext() {
    if (this.totalPages && this.totalPages == this.currentPage) return;
    this.currentPage += 1;
    this.pageChanged.emit({page: this.currentPage});
  }

}
