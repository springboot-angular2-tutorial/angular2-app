import {Pipe} from 'angular2/core';

const pluralize = require('pluralize');

@Pipe({name: 'pluralize'})
export class PluralizePipe {

  transform(count:number, args:any[]) {
    if(!args[0]) throw "Specify a word to pluralize";
    return pluralize(args[0], count, true);
  }

}
