import {Router} from "@angular/router-deprecated";
import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {HttpErrorHandler} from "./http-error-handler";
import {LoginService} from "./login.service";
import {APP_TEST_PROVIDERS} from "../../app";
import {prepareAppInjector} from "../testing/helpers";

describe('HttpErrorHandler', () => {

  let errorHandler:HttpErrorHandler;
  let loginService:LoginService;
  let router:Router;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(prepareAppInjector());
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
