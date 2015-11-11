const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Component, View, By, DebugElement} from 'angular2/angular2';
import {
  injectAsync,
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
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {BaseResponseOptions, Response} from 'angular2/http';

import {App, LoginPage} from 'app/components';
import {APP_TEST_PROVIDERS} from "app/bindings";
import {TestContext, createTestContext} from 'app/testing';
import {LoginService} from "app/services";

export function main() {
  describe('LoginPage', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;
    var loginService:LoginService;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(inject([LoginService], _ => loginService = _));
    beforeEach(createTestContext(_ => ctx = _));
    beforeEach(done => {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(LoginPage));
        });
    });
    afterEach(() => localStorage.clear());

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
    });

    it('can login', (done) => {
      const cmp:LoginPage = cmpDebugElement.componentInstance;
      spyOn(loginService, 'login').and.callThrough();
      ctx.backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
      });
      cmp.login('test@test.com', 'secret');
      expect(loginService.login).toHaveBeenCalledWith('test@test.com', 'secret');
      ctx.router.subscribe(() => {
        expect(ctx.location.path()).toEqual('/home');
        done();
      });
    });

    it('can navigate to signup page', (done) => {
      const el = cmpDebugElement.nativeElement;
      DOM.querySelector(el, 'a').click();
      ctx.router.subscribe(() => {
        expect(ctx.location.path()).toEqual('/signup');
        done();
      });
    });

  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<login-page></login-page>`,
  directives: [LoginPage],
})
class TestCmp {
}
