import {Component, EventEmitter} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";

@Component({
  selector: 'mpt-pager',
  properties: ['totalPages', 'currentPage'],
  events: ['pageChanged'],
  template: require('./pager.html'),
  directives: [CORE_DIRECTIVES],
})
export class PagerComponent {

  currentPage:number = 1;
  totalPages:number;
  pageChanged:EventEmitter<any> = new EventEmitter();

  showPrev() {
    if (this.currentPage === 1) return;
    this.currentPage -= 1;
    this.pageChanged.emit({page: this.currentPage});
  }

  showNext() {
    if (this.totalPages && this.totalPages === this.currentPage) return;
    this.currentPage += 1;
    this.pageChanged.emit({page: this.currentPage});
  }

}
