import {Pipe, PipeTransform} from "@angular/core";

const ta = require('time-ago')();

@Pipe({name: 'timeAgo'})
export class TimeAgoPipe implements PipeTransform {

  transform(value:any) {
    return ta.ago(value);
  }

}
