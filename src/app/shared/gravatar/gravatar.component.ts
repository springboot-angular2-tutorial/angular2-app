import {Component, OnChanges, Input, SimpleChanges} from "@angular/core";

const md5Hex = require('md5-hex');

@Component({
  selector: 'mpt-gravatar',
  styleUrls: ['./gravatar.component.css'],
  templateUrl: './gravatar.component.html',
})
export class GravatarComponent implements OnChanges {

  imageUrl: string;
  loading: boolean = true;

  @Input() email: string;
  @Input() size: number;
  @Input() alt: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.email) {
      const hash = md5Hex(this.email);
      this.imageUrl = `https://secure.gravatar.com/avatar/${hash}?s=${this.size}`;
    }
  }

  showImg(): void {
    this.loading = false;
  }

}
