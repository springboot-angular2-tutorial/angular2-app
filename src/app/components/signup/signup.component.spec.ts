import {Component, DebugElement} from "@angular/core";
import {Location} from "@angular/common";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  async
} from "@angular/core/testing";
import {BaseResponseOptions, Response} from "@angular/http";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {MockBackend} from "@angular/http/testing";
import {Router} from "@angular/router-deprecated";
import {SignupComponent} from "./signup.component";
import {LoginService} from "../../../shared/services";
import {APP_TEST_PROVIDERS} from "../../index";
import {prepareAppInjector} from "../../../shared/testing";

describe('SignupComponent', () => {

  let cmpDebugElement:DebugElement;

  let loginService:LoginService;
  let backend:MockBackend;
  let router:Router;
  let location:Location;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(prepareAppInjector());
  beforeEach(inject([LoginService, MockBackend, Router, Location], (..._) => {
    [loginService, backend, router, location] = _;
  }));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        cmpDebugElement = fixture.debugElement.query(By.directive(SignupComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can validate inputs', () => {
    const page:SignupComponent = cmpDebugElement.componentInstance;
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
    const page:SignupComponent = cmpDebugElement.componentInstance;
    spyOn(loginService, 'login').and.callThrough();
    backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new BaseResponseOptions()));
    });
    page.onSubmit({
      email: 'test@test.com',
      password: 'secret',
      name: 'akira',
    });
    expect(loginService.login).toHaveBeenCalledWith('test@test.com', 'secret');

    router.subscribe(() => {
      expect(location.path()).toEqual('/home');
      done();
    });
  });

});

@Component({
  template: `<mpt-signup></mpt-signup>`,
  directives: [SignupComponent],
})
class TestComponent {
}
