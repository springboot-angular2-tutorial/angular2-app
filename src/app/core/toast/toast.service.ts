import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Toast} from "./toast";

@Injectable()
export class ToastService {

  private toastEvents: Subject<Toast> = new Subject<Toast>();

  get events(): Observable<Toast> {
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

  private publish(toast: Toast) {
    this.toastEvents.next(toast);
  }

}
