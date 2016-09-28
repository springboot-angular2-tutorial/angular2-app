import {FormControl, ValidatorFn} from "@angular/forms";

export class Validators {

  static match(c1:FormControl):ValidatorFn {
    return (c2) => {
      if (c1.value !== c2.value) return {matched: false};
    };
  }

}
