import {Control} from "angular2/angular2";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  iit,
} from 'angular2/testing';

import {Validators} from 'app/forms';

export function main() {
  describe('Validator', () => {

    describe('.match', () => {
      it('validates the match of two controls', () => {
        const ctrl1 = new Control('test1');
        const ctrl2 = new Control('test2');
        expect(Validators.match(ctrl1)(ctrl1)).toBeUndefined();
        expect(Validators.match(ctrl1)(ctrl2)).toEqual({matched: false});
      });
    }); // .match

    describe('.email', () => {
      it('validates email', () => {
        const validEmail = new Control('test@test.com');
        const invalidEmail = new Control('test');
        expect(Validators.email(validEmail)).toBeUndefined();
        expect(Validators.email(invalidEmail)).toEqual({email: false});
      });
    }); // .email

    describe('.minLength', () => {
      it('validates min length', () => {
        const ctrl = new Control('abc');
        expect(Validators.minLength(3)(ctrl)).toBeUndefined();
        expect(Validators.minLength(4)(ctrl)).toEqual({minLength: false});
      });
    }); // .minLength

  });
}
