import {Pipe} from "@angular/core";

const pluralize = require('pluralize');

@Pipe({name: 'pluralize'})
export class PluralizePipe {

  transform(count:number, word:string) {
    return pluralize(word, count, true);
  }

}
