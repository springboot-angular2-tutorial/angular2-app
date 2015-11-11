import {Control} from 'angular2/angular2';

function isBlank(val:string) {
  return val == '';
}

export class Validators {

  static match(c1:Control):(c2:Control) => any {
    return (c2) => {
      if (c1.value != c2.value) return {matched: false};
    };
  }

  static email(c:Control) {
    if (isBlank(c.value)) return;
    if (!new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$").test(c.value)) {
      return {email: false};
    }
  }

  static minLength(min:Number):(c:Control) => any {
    return (c) => {
      if (isBlank(c.value)) return;
      if (c.value.length < min) return {minLength: false};
    }
  }

}
