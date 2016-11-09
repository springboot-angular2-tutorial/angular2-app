import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Toast, ToastEvent} from "./toast";

@Injectable()
export class ToastService {

  private toastEvents: Subject<ToastEvent> = new Subject<Toast>();

  get events(): Observable<ToastEvent> {
    return this.toastEvents;
  }

  success(message: string) {
    this.publish({message: message, level: 'success'});
  }

  warning(message: string) {
    this.publish({message: message, level: 'warning'});
  }

  error(message: string) {
    this.publish({message: message, level: 'error'});
  }

  private publish(toast: ToastEvent) {
    this.toastEvents.next(toast);
  }

}
