import {Control} from "@angular/common";
import {Validators} from "app/forms";

describe('Validator', () => {

  describe('.match', () => {
    it('validates the match of two controls', () => {
      const ctrl1 = new Control('test1');
      const ctrl2 = new Control('test2');
      expect(Validators.match(ctrl1)(ctrl1)).toBeUndefined();
      expect(Validators.match(ctrl1)(ctrl2)).toEqual({matched: false});
    });
  }); // .match

});
