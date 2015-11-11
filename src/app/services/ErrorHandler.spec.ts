import {Router} from 'angular2/router';
import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  xit,
  iit,
} from 'angular2/testing';

import {APP_TEST_PROVIDERS} from "app/bindings";
import {ErrorHandler, LoginService} from "app/services";
import {HttpAuthError} from "app/http";

export function main() {
  describe('ErrorHandler', () => {

    var errorHandler:ErrorHandler;
    var loginService:LoginService;
    var router:Router;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(inject([ErrorHandler, LoginService, Router], (..._) => {
      [errorHandler, loginService, router] = _;
      spyOn(loginService, 'logout');
      spyOn(router, 'navigate');
    }));

    describe('.handle', () => {
      it('handles a HttpAuthError', () => {
        errorHandler.handle(new HttpAuthError('msg'));
        expect(loginService.logout).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/Login']);
      });

      it('does not handle other errors', () => {
        errorHandler.handle(new Error('msg'));
        expect(loginService.logout).not.toHaveBeenCalled();
        expect(router.navigate).not.toHaveBeenCalled();
      });
    }); // .handle

  });
}
