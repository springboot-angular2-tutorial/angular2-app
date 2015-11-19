import {Component, View, EventEmitter} from 'angular2/angular2';

import {MicropostService, ErrorHandler, LoginService} from 'app/services';

const toastr = require('toastr');

@Component({
  selector: 'micropost-new',
  events: ['created'],
})
@View({
  styles: [require('./new.scss')],
  template: require('./new.html'),
})
export class MicropostNew {

  created:EventEmitter<any> = new EventEmitter();

  constructor(private micropostService:MicropostService,
              private errorHandler:ErrorHandler) {
  }

  create(content:HTMLInputElement) {
    if (content.value == '') {
      toastr.warning('Type your post.');
      return;
    }

    this.micropostService.create(content.value)
      .subscribe(() => {
        toastr.success('Micropost created!');
        content.value = '';
        this.created.next({});
      }, e => this.errorHandler.handle(e))
    ;
  }

}
