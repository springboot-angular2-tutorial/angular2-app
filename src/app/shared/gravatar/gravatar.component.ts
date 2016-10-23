import {Component, OnChanges, Input, SimpleChanges} from "@angular/core";

@Component({
  selector: 'mpt-gravatar',
  styleUrls: ['./gravatar.component.css'],
  templateUrl: './gravatar.component.html',
})
export class GravatarComponent implements OnChanges {

  imageUrl: string;
  isLoading: boolean = true;

  @Input() hash: string;
  @Input() size: number;
  @Input() alt: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hash) {
      this.imageUrl = `https://secure.gravatar.com/avatar/${this.hash}?s=${this.size}`;
    }
  }

  stopLoading(): void {
    this.isLoading = false;
  }

}
