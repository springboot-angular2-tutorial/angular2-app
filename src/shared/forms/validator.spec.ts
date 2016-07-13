import {
  FormControl,
  disableDeprecatedForms,
  provideForms
} from "@angular/forms";
import {Validators} from "./validators";
import {addProviders} from "@angular/core/testing";

describe('Validator', () => {

  beforeEach(() => addProviders([
    disableDeprecatedForms(),
    provideForms(),
  ]));

  describe('.match', () => {
    it('validates the match of two controls', () => {
      const ctrl1 = new FormControl('test1');
      const ctrl2 = new FormControl('test2');
      expect(Validators.match(ctrl1)(ctrl1)).toBeUndefined();
      expect(Validators.match(ctrl1)(ctrl2)).toEqual({matched: false});
    });
  }); // .match

});
