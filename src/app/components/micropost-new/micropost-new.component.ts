import {Component, EventEmitter, Output} from "@angular/core";
import * as toastr from "toastr";
import {MicropostService} from "../../core/services/micropost.service";
import {HttpErrorHandler} from "../../core/services/http-error-handler";
import {styles} from "./micropost-new.component.styles";

@Component({
  selector: 'mpt-micropost-new',
  templateUrl: 'micropost-new.component.html',
})
export class MicropostNewComponent {

  @Output() created = new EventEmitter();

  styles: any = styles;

  constructor(private micropostService: MicropostService,
              private errorHandler: HttpErrorHandler) {
  }

  create(content: HTMLInputElement) {
    if (content.value === '') {
      toastr.warning('Type your post.');
      return;
    }

    this.micropostService.create(content.value)
      .subscribe(() => {
        toastr.success('Micropost created!');
        content.value = '';
        this.created.emit({});
      }, e => this.errorHandler.handle(e))
    ;
  }

}
