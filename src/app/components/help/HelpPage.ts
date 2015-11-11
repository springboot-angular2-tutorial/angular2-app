import {Component, View} from 'angular2/angular2';

import {PublicPage} from 'app/routes'

@Component({
  selector: 'help-page',
})
@View({
  template: require('./help.html'),
})
@PublicPage()
export class HelpPage {
}
