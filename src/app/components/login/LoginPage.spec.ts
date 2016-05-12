import {Component, provide, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {BaseResponseOptions, Response} from "@angular/http";
import {ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated";
import {App, LoginPage} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";
import {LoginService} from "app/services";

describe('LoginPage', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;
  var loginService:LoginService;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(inject([LoginService], _ => {
    loginService = _;
  }));
  beforeEach(createTestContext(_ => ctx = _));
  beforeEach(done => {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(LoginPage));
      });
  });

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
    getDOM().querySelector(el, 'a').click();
    ctx.router.subscribe(() => {
      expect(ctx.location.path()).toEqual('/signup');
      done();
    });
  });

});

@Component({
  selector: 'test-cmp',
  template: `<login-page></login-page>`,
  directives: [LoginPage],
})
class TestCmp {
}
