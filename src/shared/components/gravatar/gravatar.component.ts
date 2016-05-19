import {Component, OnChanges} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";

const md5Hex = require('md5-hex');

@Component({
  selector: 'mpt-gravatar',
  properties: ['email', 'size', 'alt'],
  template: require('./gravatar.html'),
  directives: [CORE_DIRECTIVES],
})
export class GravatarComponent implements OnChanges {

  email:string;
  size:number;
  alt:string;
  imageUrl:string;

  ngOnChanges() {
    if (this.email) {
      const hash = md5Hex(this.email);
      this.imageUrl = `https://secure.gravatar.com/avatar/${hash}?s=${this.size}`;
    }
  }

}
