import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";

@Component({
  selector: 'mpt-pager',
  template: require('./pager.html'),
  directives: [CORE_DIRECTIVES],
})
export class PagerComponent {

  @Input() currentPage:number = 1;
  @Input() totalPages:number;

  @Output() pageChanged = new EventEmitter();

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
