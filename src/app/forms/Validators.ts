import {Control} from "angular2/common";

function isBlank(val:string) {
  return val === '';
}

export class Validators {

  static match(c1:Control):(c2:Control) => any {
    return (c2) => {
      if (c1.value !== c2.value) return {matched: false};
    };
  }

  static email(c:Control) {
    if (isBlank(c.value)) return;
    const emailPattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
    if (!new RegExp(emailPattern).test(c.value)) {
      return {email: false};
    }
  }

}
