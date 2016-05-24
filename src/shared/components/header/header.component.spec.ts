import {Observable} from "rxjs/Observable";
import {Component, DebugElement} from "@angular/core";
import {Location} from "@angular/common";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  async
} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {Router} from "@angular/router-deprecated";
import {APP_TEST_PROVIDERS} from "../../../app";
import {HeaderComponent} from "./header.component";
import {LoginService, UserService} from "../../services";
import {login, prepareAppInjector} from "../../testing";

describe('HeaderComponent', () => {

  let cmpDebugElement:DebugElement;

  let router:Router;
  let location:Location;
  let fixture:ComponentFixture<any>;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(prepareAppInjector());
  beforeEach(inject([Router, Location], (..._) => {
    [router, location] = _;
  }));

  const initComponent = ():Function => {
    return async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      tcb
        .createAsync(TestComponent)
        .then(_ => {
          fixture = _;
          cmpDebugElement = fixture.debugElement.query(By.directive(HeaderComponent));
          fixture.detectChanges();
        });
    }));
  };

  describe('when signed in', () => {
    let loginService:LoginService;

    beforeEach(inject([LoginService], _ => loginService = _));
    beforeEach(login());
    beforeEach(initComponent());

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
    });

    it('shows a nav link to home', (done) => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.home>a');
      expect(link).toBeTruthy();
      link.click();
      router.subscribe(() => {
        fixture.detectChanges();
        expect(location.path()).toEqual('/home');
        expect(link.parentElement.classList).toContain('active');
        done();
      });
    });

    it('does not show a nav link to top', () => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.top>a');
      expect(link).toBeNull();
    });

    it('shows a nav link to users', (done) => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.users>a');
      expect(link).toBeTruthy();
      link.click();
      router.subscribe(() => {
        fixture.detectChanges();
        expect(location.path()).toEqual('/users');
        expect(link.parentElement.classList).toContain('active');
        done();
      });
    });

    it('shows a nav link to help', (done) => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.help>a');
      expect(link).toBeTruthy();
      link.click();
      router.subscribe(() => {
        fixture.detectChanges();
        expect(location.path()).toEqual('/help');
        expect(link.parentElement.classList).toContain('active');
        done();
      });
    });

    it('shows a nav link to profile', (done) => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.profile>a');
      expect(link).toBeTruthy();
      link.click();
      router.subscribe(() => {
        fixture.detectChanges();
        expect(location.path()).toEqual('/users/me');
        done();
      });
    });

    describe('navigate to settings', () => {
      beforeEach(inject([UserService], userService => {
        spyOn(userService, 'get').and.returnValue(Observable.of({}));
      }));
      it('shows a nav link to settings', (done) => {
        const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.settings>a');
        expect(link).toBeTruthy();
        link.click();
        router.subscribe(() => {
          fixture.detectChanges();
          expect(location.path()).toEqual('/users/me/edit');
          done();
        });
      });
    });

    it('shows a nav link to logout', () => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.logout>a');
      expect(link).toBeTruthy();
      spyOn(loginService, 'logout');
      link.click();
      expect(loginService.logout).toHaveBeenCalled();
    });
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

    it('shows a nav link to top', (done) => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.top>a');
      expect(link).toBeTruthy();
      link.click();
      router.subscribe(() => {
        fixture.detectChanges();
        expect(location.path()).toEqual('');
        done();
      });
    });

    it('does not show a nav link to users', () => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.users>a');
      expect(link).toBeNull();
    });

    it('shows a nav link to help', (done) => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.help>a');
      expect(link).toBeTruthy();
      link.click();
      router.subscribe(() => {
        fixture.detectChanges();
        expect(location.path()).toEqual('/help');
        expect(link.parentElement.classList).toContain('active');
        done();
      });
    });

    it('does not show a nav link to profile', () => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.profile>a');
      expect(link).toBeNull();
    });

    it('does not show a nav link to settings', () => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.settings>a');
      expect(link).toBeNull();
    });

    it('shows a nav link to sign in', (done) => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.login>a');
      expect(link).toBeTruthy();
      link.click();
      router.subscribe(() => {
        fixture.detectChanges();
        expect(location.path()).toEqual('/login');
        done();
      });
    });
  }); // when not signed in

  describe('.isActive', () => {
    beforeEach(initComponent());

    it('return true when path matches', () => {
      const cmp:HeaderComponent = cmpDebugElement.componentInstance;
      spyOn(location, 'path').and.returnValue('/users');
      expect(cmp.isActive('/users')).toBeTruthy();
    });

    it('return true when path including query parameter matches', () => {
      const cmp:HeaderComponent = cmpDebugElement.componentInstance;
      spyOn(location, 'path').and.returnValue('/users?page=1');
      expect(cmp.isActive('/users')).toBeTruthy();
    });

    it('return false when path does not matche', () => {
      const cmp:HeaderComponent = cmpDebugElement.componentInstance;
      spyOn(location, 'path').and.returnValue('/home');
      expect(cmp.isActive('/users')).toBeFalsy();
    });
  }); // .isActive

});

@Component({
  template: `<mpt-header></mpt-header>`,
  directives: [HeaderComponent],
})
class TestComponent {
}
