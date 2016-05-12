import {Component, EventEmitter} from "@angular/core";
import {MicropostService, HttpErrorHandler} from "app/services";

const toastr = require('toastr');

@Component({
  selector: 'micropost-new',
  events: ['created'],
  styles: [require('./new.scss')],
  template: require('./new.html'),
})
export class MicropostNew {

  created:EventEmitter<any> = new EventEmitter();

  constructor(private micropostService:MicropostService,
              private errorHandler:HttpErrorHandler) {
  }

  create(content:HTMLInputElement) {
    if (content.value === '') {
      toastr.warning('Type your post.');
      return;
    }

    this.micropostService.create(content.value)
      .subscribe(() => {
        toastr.success('Micropost created!');
        content.value = '';
        this.created.emit({});
      }, e => this.errorHandler.handle(e))
    ;
  }

}
