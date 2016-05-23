import {Pipe, PipeTransform} from "@angular/core";

const pluralize = require('pluralize');

@Pipe({name: 'pluralize'})
export class PluralizePipe implements PipeTransform {

  transform(count:number, word:string) {
    return pluralize(word, count, true);
  }

}
