import {Component, provide, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {BaseResponseOptions, Response} from "@angular/http";
import {ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated";
import {App, SignupPage} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";
import {LoginService} from "app/services";

describe('SignupPage', () => {

  var ctx:TestContext;

  var cmpDebugElement:DebugElement;
  var loginService:LoginService;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));
  beforeEach(inject([LoginService], _ => {
    loginService = _;
  }));
  beforeEach(done => {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(SignupPage));
      });
  });

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can validate inputs', () => {
    const page:SignupPage = cmpDebugElement.componentInstance;
    page.name.updateValue('a', {});
    page.email.updateValue('b', {});
    page.password.updateValue('c', {});
    page.passwordConfirmation.updateValue('d', {});
    expect(page.myForm.valid).toBeFalsy();
    page.name.updateValue('akira', {});
    page.email.updateValue('test@test.com', {});
    page.password.updateValue('secret123', {});
    page.passwordConfirmation.updateValue('secret123', {});
    expect(page.myForm.valid).toBeTruthy();
  });

  it('can signup', (done) => {
    const page:SignupPage = cmpDebugElement.componentInstance;
    spyOn(loginService, 'login').and.callThrough();
    ctx.backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new BaseResponseOptions()));
    });
    page.onSubmit({
      email: 'test@test.com',
      password: 'secret',
      name: 'akira',
    });
    expect(loginService.login).toHaveBeenCalledWith('test@test.com', 'secret');

    ctx.router.subscribe(() => {
      expect(ctx.location.path()).toEqual('/home');
      done();
    });
  });

});

@Component({
  selector: 'test-cmp',
  template: `<signup-page></signup-page>`,
  directives: [SignupPage],
})
class TestCmp {
}
