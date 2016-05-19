import {Component, EventEmitter} from "@angular/core";
import {HttpErrorHandler, MicropostService} from "../../services";

const toastr = require('toastr');

@Component({
  selector: 'mpt-micropost-new',
  events: ['created'],
  styles: [require('./micropost-new.scss')],
  template: require('./micropost-new.html'),
})
export class MicropostNewComponent {

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
