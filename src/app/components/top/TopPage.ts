import {Component, View} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {PublicPage} from 'app/routes'

@Component({
  selector: 'top-page',
})
@View({
  styles: [require('./top.scss')],
  template: require('./top.html'),
  directives: [ROUTER_DIRECTIVES],
})
@PublicPage({
  whenSignedIn: (router) => router.navigate(['/Home'])
})
export class TopPage {
}
