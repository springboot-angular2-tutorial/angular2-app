import {Control} from "@angular/common";

export const EMAIL_PATTERN = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

export class Validators {

  static match(c1:Control):(c2:Control) => any {
    return (c2) => {
      if (c1.value !== c2.value) return {matched: false};
    };
  }

}
