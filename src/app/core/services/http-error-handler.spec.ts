import {inject, TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {HttpErrorHandler} from "./http-error-handler";
import {LoginService} from "./login.service";
import {APP_TEST_HTTP_PROVIDERS} from "../http/index";
import {CoreModule} from "../core.module";

describe('HttpErrorHandler', () => {

  let errorHandler: HttpErrorHandler;
  let loginService: LoginService;
  let router: Router;

  class MockRouter {
    navigate() {
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
      ],
      providers: [
        {
          provide: Router,
          useClass: MockRouter,
        },
        APP_TEST_HTTP_PROVIDERS,
      ],
    });
  });

  beforeEach(inject([HttpErrorHandler, LoginService, Router], (..._) => {
    [errorHandler, loginService, router] = _;
    spyOn(loginService, 'logout');
    spyOn(router, 'navigate');
  }));

  describe('.handle', () => {
    it('handles 401 response', () => {
      errorHandler.handle({status: 401});
      expect(loginService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['login']);
    });

    it('does not handle other errors', () => {
      errorHandler.handle({status: 400});
      expect(loginService.logout).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  }); // .handle

});
