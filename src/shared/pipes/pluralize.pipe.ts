import {Pipe, PipeTransform} from "@angular/core";
import * as pluralize from "pluralize";

@Pipe({name: 'pluralize'})
export class PluralizePipe implements PipeTransform {

  transform(count:number, word:string) {
    return pluralize(word, count, true);
  }

}
