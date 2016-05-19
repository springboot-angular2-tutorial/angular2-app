import {Control} from "@angular/common";

export class Validators {

  static match(c1:Control):(c2:Control) => any {
    return (c2) => {
      if (c1.value !== c2.value) return {matched: false};
    };
  }

}
