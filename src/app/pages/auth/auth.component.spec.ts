import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {
  fakeAsync,
  TestBed,
  ComponentFixture,
  inject
} from "@angular/core/testing";
import {Response, ResponseOptions} from "@angular/http";
import {Location} from "@angular/common";
import {MockBackend} from "@angular/http/testing";
import {Router} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../../core/services/auth.service";
import {CoreModule} from "../../core";
import {AuthModule} from "./auth.module";
import {APP_TEST_HTTP_PROVIDERS, advance} from "../../../testing";

describe('AuthComponent', () => {

  @Component({
    template: `<mpt-auth></mpt-auth><router-outlet></router-outlet>`,
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
  let authService: AuthService;
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
        AuthModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        BlankComponent,
      ]
    });
  });
  beforeEach(inject([AuthService, MockBackend, Router, Location], (..._) => {
    [authService, backend, router, location] = _;
  }));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(AuthComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can login', fakeAsync(() => {
    const cmp: AuthComponent = cmpDebugElement.componentInstance;
    spyOn(authService, 'login').and.callThrough();
    backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify({token: 'my jwt'}),
      })));
    });
    cmp.login('test@test.com', 'secret');
    expect(authService.login).toHaveBeenCalledWith('test@test.com', 'secret');
    advance(fixture);
    expect(location.path()).toEqual('/home');
  }));

  it('can navigate to signup page', () => {
    const el = cmpDebugElement.nativeElement;
    const signupLink = getDOM().querySelector(el, 'a[href="/signup"]');
    expect(signupLink).toBeTruthy();
  });

});
