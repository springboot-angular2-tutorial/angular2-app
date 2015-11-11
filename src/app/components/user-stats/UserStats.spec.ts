const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Component, View, By, DebugElement, provide} from 'angular2/angular2';
import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  iit,
} from 'angular2/testing';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {ResponseOptions, Response} from 'angular2/http';
import {RouteParams} from 'angular2/router';
import {ObservableWrapper} from "angular2/src/core/facade/async";

import {UserStats, Gravatar} from "app/components";
import {APP_TEST_PROVIDERS} from "app/bindings";
import {TestContext, createTestContext, signin} from 'app/testing';

const dummyResponse = new Response(new ResponseOptions({
  body: {
    user: {
      id: 1,
      email: 'test1@test.com',
      name: 'test1',
    },
    userStats: {
      micropostCnt: 2,
      followingCnt: 3,
      followerCnt: 4,
    },
  }
}));

export function main() {
  describe('UserStats', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(createTestContext(_ => ctx = _));

    function createCmp(done) {
      ctx.backend.connections.subscribe(conn => {
        conn.mockRespond(dummyResponse);
      });
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(UserStats));
        });
    }

    beforeEach(createCmp);

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();

      const cmp:UserStats = cmpDebugElement.componentInstance;
      expect(cmp.userId).toEqual('1');
      expect(cmp.user).toBeTruthy();
      expect(cmp.user.id).toEqual(1);
      expect(cmp.userStats).toBeTruthy();
      expect(cmp.userStats.micropostCnt).toEqual(2);

      const gravatarDebugElement = cmpDebugElement.query(By.directive(Gravatar));
      expect(gravatarDebugElement).toBeTruthy();
      expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');
      expect(gravatarDebugElement.componentInstance.alt).toEqual('test1');

      const el = cmpDebugElement.nativeElement;
      const header = DOM.querySelector(el, 'h2');
      expect(header.innerText).toMatch(/test1/);

      const profileLink = DOM.querySelector(el, 'a.profile-link');
      expect(profileLink).toBeTruthy();
      expect(profileLink.getAttribute('href')).toEqual('/users/1');

      const postCnt = DOM.querySelector(el, '.microposts');
      expect(postCnt).toBeTruthy();
      expect(postCnt.innerText).toMatch(/2 microposts/);

      const followingsLink = DOM.querySelector(el, 'a.followings');
      expect(followingsLink).toBeTruthy();
      expect(followingsLink.getAttribute('href')).toEqual('/users/1/followings');
      expect(followingsLink.innerText).toMatch(/3[\s\S]*?followings/);

      const followersLink = DOM.querySelector(el, 'a.followers');
      expect(followersLink).toBeTruthy();
      expect(followersLink.getAttribute('href')).toEqual('/users/1/followers');
      expect(followersLink.innerText).toMatch(/4[\s\S]*?followers/);
    });

    describe('when shown on profile', () => {
      beforeEach(() => {
        const cmp:UserStats = cmpDebugElement.componentInstance;
        cmp.shownOnProfile = true;
        ctx.rootTC.detectChanges();
      });

      it('does not show profile link', () => {
        const profileLink = DOM.querySelector(cmpDebugElement.nativeElement, 'a.profile-link');
        expect(profileLink).toBeFalsy();
      });

      it('does not show post counts', () => {
        const postCnt = DOM.querySelector(cmpDebugElement.nativeElement, '.microposts');
        expect(postCnt).toBeFalsy();
      });
    });

  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<user-stats user-id="1" [shown-on-profile]="false"></user-stats>`,
  directives: [UserStats],
})
class TestCmp {
}
