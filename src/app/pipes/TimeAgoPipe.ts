import {Pipe} from 'angular2/angular2';

const ta = require('time-ago')();

@Pipe({name: 'timeAgo'})
export class TimeAgoPipe {

  transform(value:any) {
    return ta.ago(value);
  }

}
