import {Component, OnChanges, Input} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";

const md5Hex = require('md5-hex');

@Component({
  selector: 'mpt-gravatar',
  template: require('./gravatar.html'),
  directives: [CORE_DIRECTIVES],
})
export class GravatarComponent implements OnChanges {

  imageUrl:string;

  @Input() email:string;
  @Input() size:number;
  @Input() alt:string;

  ngOnChanges() {
    if (this.email) {
      const hash = md5Hex(this.email);
      this.imageUrl = `https://secure.gravatar.com/avatar/${hash}?s=${this.size}`;
    }
  }

}
