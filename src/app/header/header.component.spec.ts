import {Observable} from "rxjs/Observable";
import {Component, DebugElement} from "@angular/core";
import {Location} from "@angular/common";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {
  inject,
  ComponentFixture,
  TestBed,
  fakeAsync
} from "@angular/core/testing";
import {Router} from "@angular/router";
import {HeaderComponent} from "./header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {CoreModule} from "../core/core.module";
import {LoginService} from "../core/services/login.service";
import {UserService} from "../core/services/user.service";
import {APP_TEST_HTTP_PROVIDERS, login, advance} from "../../testing";

describe('HeaderComponent', () => {

  @Component({
    template: `<mpt-header></mpt-header><router-outlet></router-outlet>`,
  })
  class TestComponent {
  }

  @Component({
    template: ``,
  })
  class BlankComponent {
  }

  let cmpDebugElement: DebugElement;

  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: BlankComponent},
          {path: 'users', component: BlankComponent},
          {path: 'help', component: BlankComponent},
          {path: 'users/:id', component: BlankComponent},
          {path: 'users/me/edit', component: BlankComponent},
          {path: 'login', component: BlankComponent},
          {path: '', component: BlankComponent},
        ]),
        CoreModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        HeaderComponent,
        BlankComponent,
      ]
    });
  });
  beforeEach(inject([Router, Location], (..._) => {
    [router, location] = _;
  }));

  const initComponent = () => {
    return fakeAsync(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        cmpDebugElement = fixture.debugElement.query(By.directive(HeaderComponent));
      });
    });
  };

  describe('when signed in', () => {
    let loginService: LoginService;

    beforeEach(inject([LoginService], _ => loginService = _));
    beforeEach(login());
    beforeEach(initComponent());

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
    });

    it('shows a nav link to home', fakeAsync(() => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.home>a');
      expect(link).toBeTruthy();
      link.click();
      advance(fixture);
      expect(location.path()).toEqual('/home');
      expect(link.parentElement.classList).toContain('active');
    }));

    it('does not show a nav link to top', () => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.top>a');
      expect(link).toBeNull();
    });

    it('shows a nav link to users', fakeAsync(() => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.users>a');
      expect(link).toBeTruthy();
      link.click();
      advance(fixture);
      expect(location.path()).toEqual('/users');
      expect(link.parentElement.classList).toContain('active');
    }));

    it('shows a nav link to help', fakeAsync(() => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.help>a');
      expect(link).toBeTruthy();
      link.click();
      advance(fixture);
      expect(location.path()).toEqual('/help');
      expect(link.parentElement.classList).toContain('active');
    }));

    it('shows a nav link to profile', fakeAsync(() => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.profile>a');
      expect(link).toBeTruthy();
      link.click();
      advance(fixture);
      expect(location.path()).toEqual('/users/me');
    }));

    describe('navigate to settings', () => {
      beforeEach(inject([UserService], userService => {
        spyOn(userService, 'get').and.returnValue(Observable.of({}));
      }));
      it('shows a nav link to settings', fakeAsync(() => {
        const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.settings>a');
        expect(link).toBeTruthy();
        link.click();
        advance(fixture);
        expect(location.path()).toEqual('/users/me/edit');
      }));
    });

    it('shows a nav link to logout', fakeAsync(() => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.logout>a');
      expect(link).toBeTruthy();
      spyOn(loginService, 'logout');
      link.click();
      expect(loginService.logout).toHaveBeenCalled();
    }));
  }); // when signed in

  describe('when not signed in', () => {
    beforeEach(initComponent());

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
    });

    it('does not show a nav link to home', () => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.home>a');
      expect(link).toBeNull();
    });

    it('shows a nav link to top', fakeAsync(() => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.top>a');
      expect(link).toBeTruthy();
      link.click();
      advance(fixture);
      expect(location.path()).toEqual('/');
    }));

    it('does not show a nav link to users', () => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.users>a');
      expect(link).toBeNull();
    });

    it('shows a nav link to help', fakeAsync(() => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.help>a');
      expect(link).toBeTruthy();
      link.click();
      advance(fixture);
      expect(location.path()).toEqual('/help');
      expect(link.parentElement.classList).toContain('active');
    }));

    it('does not show a nav link to profile', () => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.profile>a');
      expect(link).toBeNull();
    });

    it('does not show a nav link to settings', () => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.settings>a');
      expect(link).toBeNull();
    });

    it('shows a nav link to sign in', fakeAsync(() => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.login>a');
      expect(link).toBeTruthy();
      link.click();
      advance(fixture);
      expect(location.path()).toEqual('/login');
    }));
  }); // when not signed in

});
