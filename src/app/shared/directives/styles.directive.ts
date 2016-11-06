import {Directive, ElementRef, Input, Renderer, OnInit} from "@angular/core";
import {css} from "aphrodite";

@Directive({
  selector: '[mptStyles]'
})
export class StylesDirective implements OnInit {

  @Input('mptStyles') mptStyles: any[];

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngOnInit(): void {
    const className = css(this.mptStyles);
    this.renderer.setElementClass(this.el.nativeElement, className, true);
  }

}
