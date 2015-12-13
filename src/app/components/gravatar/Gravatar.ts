import {Component, View, OnChanges} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

const md5Hex = require('md5-hex');

@Component({
  selector: 'gravatar',
  properties: ['email', 'size', 'alt'],
})
@View({
  template: require('./gravatar.html'),
  directives: [CORE_DIRECTIVES],
})
export class Gravatar implements OnChanges {

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
