import {Component, View, provide} from "angular2/core";
import {RouteConfig, ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {
  beforeEachProviders,
  beforeEach,
  expect,
  describe,
  it
} from "angular2/testing";
import {SecurityRouterOutlet, PrivatePage, PublicPage} from "app/routes";
import {TestContext, createTestContext, signin} from "app/testing";
import {APP_TEST_PROVIDERS} from "app/providers";

describe('SecurityRouterOutlet', () => {

  var ctx:TestContext;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: TestCmp}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));

  describe('when not signed in', () => {
    beforeEach(done => {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe();
    });

    it('allows the access to public page', (done) => {
      ctx.router.navigate(['/PublicCmp']).then(() => {
        expect(ctx.location.path()).toEqual('/public');
        done();
      });
    });

    it('force redirect to login page when accessed to private page', (done) => {
      ctx.router.navigate(['/PrivateCmp']).then(() => {
        ctx.router.subscribe(() => {
          expect(ctx.location.path()).toEqual('/login');
          done();
        });
      });
    });
  }); // when not signed in

  describe('when signed in', () => {
    beforeEach(signin());
    beforeEach(done => {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe();
    });

    it('allows the access to private page', (done) => {
      ctx.router.navigate(['/PrivateCmp']).then(() => {
        expect(ctx.location.path()).toEqual('/private');
        done();
      });
    });

    it('force redirect to specified page when accessed to a page like login page', (done) => {
      ctx.router.navigate(['/Login']).then(() => {
        ctx.router.subscribe(() => {
          expect(ctx.location.path()).toEqual('/public');
          done();
        });
      });
    });
  }); // when signed in

});

@Component({selector: 'private-cmp'})
@View({template: `private`})
@PrivatePage()
class PrivateCmp {
}

@Component({selector: 'public-cmp'})
@View({template: `public`})
@PublicPage()
class PublicCmp {
}

@Component({selector: 'login-page'})
@View({template: `login`})
@PublicPage({
  whenSignedIn: (router) => router.navigate(['/PublicCmp'])
})
class LoginPage {
}

@Component({selector: 'test-cmp'})
@View({
  template: `<router-outlet></router-outlet>`,
  directives: [SecurityRouterOutlet],
})
@RouteConfig([
  {path: '/private', name: 'PrivateCmp', component: PrivateCmp},
  {path: '/public', name: 'PublicCmp', component: PublicCmp},
  {path: '/login', name: 'Login', component: LoginPage},
])
class TestCmp {
}
