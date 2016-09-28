import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {
  fakeAsync,
  TestBed,
  ComponentFixture,
  inject
} from "@angular/core/testing";
import {BaseResponseOptions, Response} from "@angular/http";
import {Location} from "@angular/common";
import {MockBackend} from "@angular/http/testing";
import {Router} from "@angular/router";
import {LoginComponent} from "./login.component";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginService} from "../core/services/login.service";
import {APP_TEST_HTTP_PROVIDERS} from "../core/http/index";
import {advance} from "../../shared/testing/helpers";
import {CoreModule} from "../core/core.module";

describe('LoginComponent', () => {

  @Component({
    template: `<mpt-login></mpt-login><router-outlet></router-outlet>`,
  })
  class TestComponent {
  }

  @Component({
    template: ``,
  })
  class BlankComponent {
  }

  let cmpDebugElement: DebugElement;

  let fixture: ComponentFixture<any>;
  let loginService: LoginService;
  let backend: MockBackend;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: BlankComponent},
        ]),
        CoreModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        LoginComponent,
        BlankComponent,
      ]
    });
  });
  beforeEach(inject([LoginService, MockBackend, Router, Location], (..._) => {
    [loginService, backend, router, location] = _;
  }));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(LoginComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can login', fakeAsync(() => {
    const cmp: LoginComponent = cmpDebugElement.componentInstance;
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
