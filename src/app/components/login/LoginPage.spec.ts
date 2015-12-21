import {Component, View, provide, DebugElement} from 'angular2/core';
import {By} from 'angular2/platform/common_dom';
import {DOM} from "angular2/src/platform/dom/dom_adapter";
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
import {BaseResponseOptions, Response} from 'angular2/http';
import {ROUTER_PRIMARY_COMPONENT} from 'angular2/router';

import {App, LoginPage} from 'app/components';
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from 'app/testing';
import {LoginService} from "app/services";

export function main() {
  describe('LoginPage', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;
    var loginService:LoginService;

    beforeEachProviders(() => [
      APP_TEST_PROVIDERS,
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
    ]);
    beforeEach(inject([LoginService], _ => {
      loginService = _
    }));
    beforeEach(createTestContext(_ => ctx = _));
    beforeEach(done => {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(() => {
          cmpDebugElement = ctx.fixture.debugElement.query(By.directive(LoginPage));
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
