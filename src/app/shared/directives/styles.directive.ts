import {
  Directive,
  ElementRef,
  Input,
  Renderer,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import {css} from "aphrodite";

@Directive({
  selector: '[mptStyles]'
})
export class StylesDirective implements OnChanges {

  @Input('mptStyles') mptStyles: any[];

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['mptStyles'].isFirstChange()) {
      const prevClassName = css(changes['mptStyles'].previousValue);
      this.renderer.setElementClass(this.el.nativeElement, prevClassName, false);
    }
    const className = css(this.mptStyles);
    this.renderer.setElementClass(this.el.nativeElement, className, true);
  }

}
