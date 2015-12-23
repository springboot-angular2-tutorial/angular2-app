import {provide} from 'angular2/core';
import {Router, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
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

import {App} from 'app/components';
import {APP_TEST_PROVIDERS} from "app/providers";
import {HttpErrorHandler, LoginService} from "app/services";

export function main() {
  describe('ErrorHandler', () => {

    var errorHandler:HttpErrorHandler;
    var loginService:LoginService;
    var router:Router;

    beforeEachProviders(() => [
      APP_TEST_PROVIDERS,
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
    ]);
    beforeEach(inject([HttpErrorHandler, LoginService, Router], (..._) => {
      [errorHandler, loginService, router] = _;
      spyOn(loginService, 'logout');
      spyOn(router, 'navigate');
    }));

    describe('.handle', () => {
      it('handles 401 response', () => {
        errorHandler.handle({status: 401});
        expect(loginService.logout).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/Login']);
      });

      it('does not handle other errors', () => {
        errorHandler.handle({status: 400});
        expect(loginService.logout).not.toHaveBeenCalled();
        expect(router.navigate).not.toHaveBeenCalled();
      });
    }); // .handle

  });
}
