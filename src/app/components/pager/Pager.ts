import {Component, View, EventEmitter} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

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
