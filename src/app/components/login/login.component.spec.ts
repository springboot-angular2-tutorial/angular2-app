import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {inject, async, addProviders} from "@angular/core/testing";
import {BaseResponseOptions, Response} from "@angular/http";
import {Location} from "@angular/common";
import {LoginComponent} from "./login.component";
import {LoginService, APP_SERVICE_PROVIDERS} from "../../../shared/services";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {MockBackend} from "@angular/http/testing";
import {Router} from "@angular/router";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

describe('LoginComponent', () => {

  @Component({
    selector: 'blank-cmp',
    template: ``,
    directives: ROUTER_DIRECTIVES
  })
  class BlankCmp {
  }


  @Component({
    template: `<mpt-login></mpt-login>`,
    directives: [LoginComponent],
  })
  class TestComponent {
  }

  let cmpDebugElement:DebugElement;

  let loginService:LoginService;
  let backend:MockBackend;
  let router:Router;
  let location:Location;

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent, [
      {path: 'signup', component: BlankCmp},
    ]),
    ...APP_TEST_HTTP_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
  ]));
  beforeEach(inject([LoginService, MockBackend, Router, Location], (..._) => {
    [loginService, backend, router, location] = _;
  }));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        cmpDebugElement = fixture.debugElement.query(By.directive(LoginComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can login', (done) => {
    const cmp:LoginComponent = cmpDebugElement.componentInstance;
    spyOn(loginService, 'login').and.callThrough();
    backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new BaseResponseOptions()));
    });
    cmp.login('test@test.com', 'secret');
    expect(loginService.login).toHaveBeenCalledWith('test@test.com', 'secret');
    router.subscribe(() => {
      expect(location.path()).toEqual('/home');
      done();
    });
  });

  it('can navigate to signup page', () => {
    const el = cmpDebugElement.nativeElement;
    getDOM().querySelector(el, 'a').click();
    expect(location.path()).toEqual('/signup');
  });

});
