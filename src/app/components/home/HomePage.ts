import {Component, View} from 'angular2/core';

import {Feed, MicropostNew, UserStats} from 'app/components';
import {PrivatePage} from 'app/routes'

@Component({
  selector: 'home-page',
})
@View({
  styles: [require('./home.scss')],
  template: require('./home.html'),
  directives: [MicropostNew, Feed, UserStats],
})
@PrivatePage()
export class HomePage {
}
