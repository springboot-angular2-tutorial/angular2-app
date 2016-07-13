import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {inject, async, addProviders, fakeAsync} from "@angular/core/testing";
import {BaseResponseOptions, Response} from "@angular/http";
import {Location} from "@angular/common";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {MockBackend} from "@angular/http/testing";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {LoginComponent} from "./login.component";
import {LoginService} from "../../../shared/services";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";
import {advance} from "../../../shared/testing/helpers";
import {APP_TEST_PROVIDERS} from "../../index";

describe('LoginComponent', () => {

  @Component({
    template: `<mpt-login></mpt-login><router-outlet></router-outlet>`,
    directives: [LoginComponent, ROUTER_DIRECTIVES],
  })
  class TestComponent {
  }

  @Component({
    template: ``,
  })
  class BlankComponent {
  }

  let cmpDebugElement:DebugElement;

  let fixture:ComponentFixture<any>;
  let loginService:LoginService;
  let backend:MockBackend;
  let router:Router;
  let location:Location;

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent, [
      {path: 'home', component: BlankComponent},
    ]),
    ...APP_TEST_PROVIDERS,
  ]));
  beforeEach(inject([LoginService, MockBackend, Router, Location], (..._) => {
    [loginService, backend, router, location] = _;
  }));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((_fixture:ComponentFixture<any>) => {
        fixture = _fixture;
        cmpDebugElement = _fixture.debugElement.query(By.directive(LoginComponent));
        _fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can login', fakeAsync(() => {
    const cmp:LoginComponent = cmpDebugElement.componentInstance;
    spyOn(loginService, 'login').and.callThrough();
    backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new BaseResponseOptions()));
    });
    cmp.login('test@test.com', 'secret');
    expect(loginService.login).toHaveBeenCalledWith('test@test.com', 'secret');
    advance(fixture);
    expect(location.path()).toEqual('/home');
  }));

  it('can navigate to signup page', () => {
    const el = cmpDebugElement.nativeElement;
    const signupLink = getDOM().querySelector(el, 'a');
    expect(signupLink.getAttribute('href')).toEqual('/signup');
  });

});
