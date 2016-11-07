import {Component, EventEmitter, Output} from "@angular/core";
import {MicropostService} from "../../core/services/micropost.service";
import {HttpErrorHandler} from "../../core/services/http-error-handler";
import {styles} from "./micropost-new.component.styles";
import {ToastService} from "../../core/toast/toast.service";

@Component({
  selector: 'mpt-micropost-new',
  templateUrl: 'micropost-new.component.html',
})
export class MicropostNewComponent {

  @Output() created = new EventEmitter();

  styles: any = styles;

  constructor(private micropostService: MicropostService,
              private errorHandler: HttpErrorHandler,
              private toastService: ToastService) {
  }

  create(content: HTMLInputElement) {
    if (content.value === '') {
      this.toastService.warning('Type your post.');
      return;
    }

    this.micropostService.create(content.value)
      .subscribe(() => {
        this.toastService.success('Micropost created!');
        content.value = '';
        this.created.emit({});
      }, e => this.errorHandler.handle(e))
    ;
  }

}
