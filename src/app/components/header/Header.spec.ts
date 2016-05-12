import {Component, provide, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated";
import {Header, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext, signin} from "app/testing";
import {LoginService} from "app/services";
import {UserService} from "../../services/UserService";
import {Observable} from "rxjs/Observable";

describe('Header', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));

  function createCmp(done) {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Header));
      });
  }

  describe('when signed in', () => {
    let loginService:LoginService;

    beforeEach(inject([LoginService], _ => {
      loginService = _;
    }));
    beforeEach(signin({id: 1, email: 'test@test.com'}));
    beforeEach(createCmp);

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
    });

    it('shows a nav link to home', (done) => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.home>a');
      expect(link).toBeTruthy();
      link.click();
      ctx.router.subscribe(() => {
        ctx.fixture.detectChanges();
        expect(ctx.location.path()).toEqual('/home');
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
      ctx.router.subscribe(() => {
        ctx.fixture.detectChanges();
        expect(ctx.location.path()).toEqual('/users');
        expect(link.parentElement.classList).toContain('active');
        done();
      });
    });

    it('shows a nav link to help', (done) => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.help>a');
      expect(link).toBeTruthy();
      link.click();
      ctx.router.subscribe(() => {
        ctx.fixture.detectChanges();
        expect(ctx.location.path()).toEqual('/help');
        expect(link.parentElement.classList).toContain('active');
        done();
      });
    });

    it('shows a nav link to profile', (done) => {
      const link = getDOM().querySelector(cmpDebugElement.nativeElement, '#navbar li.profile>a');
      expect(link).toBeTruthy();
      link.click();
      ctx.router.subscribe(() => {
        ctx.fixture.detectChanges();
        expect(ctx.location.path()).toEqual('/users/me');
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
        ctx.router.subscribe(() => {
          ctx.fixture.detectChanges();
          expect(ctx.location.path()).toEqual('/users/me/edit');
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
    beforeEach(createCmp);

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
      ctx.router.subscribe(() => {
        ctx.fixture.detectChanges();
        expect(ctx.location.path()).toEqual('');
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
      ctx.router.subscribe(() => {
        ctx.fixture.detectChanges();
        expect(ctx.location.path()).toEqual('/help');
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
      ctx.router.subscribe(() => {
        ctx.fixture.detectChanges();
        expect(ctx.location.path()).toEqual('/login');
        done();
      });
    });
  }); // when not signed in

  describe('.isActive', () => {
    beforeEach(createCmp);

    it('return true when path matches', () => {
      const cmp:Header = cmpDebugElement.componentInstance;
      spyOn(ctx.location, 'path').and.returnValue('/users');
      expect(cmp.isActive('/users')).toBeTruthy();
    });

    it('return true when path including query parameter matches', () => {
      const cmp:Header = cmpDebugElement.componentInstance;
      spyOn(ctx.location, 'path').and.returnValue('/users?page=1');
      expect(cmp.isActive('/users')).toBeTruthy();
    });

    it('return false when path does not matche', () => {
      const cmp:Header = cmpDebugElement.componentInstance;
      spyOn(ctx.location, 'path').and.returnValue('/home');
      expect(cmp.isActive('/users')).toBeFalsy();
    });
  }); // .isActive

});

@Component({
  selector: 'test-cmp',
  template: `<app-header></app-header>`,
  directives: [Header],
})
class TestCmp {
}
