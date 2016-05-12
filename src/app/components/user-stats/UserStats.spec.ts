import {Component, provide, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {beforeEachProviders, beforeEach} from "@angular/core/testing";
import {ResponseOptions, Response} from "@angular/http";
import {ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated";
import {UserStats, Gravatar, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";

const dummyResponse = new Response(new ResponseOptions({
  body: {
    id: 1,
    email: 'test1@test.com',
    name: 'test1',
    userStats: {
      micropostCnt: 2,
      followingCnt: 3,
      followerCnt: 4,
    },
  }
}));

describe('UserStats', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));

  function createCmp(done) {
    ctx.backend.connections.subscribe(conn => {
      conn.mockRespond(dummyResponse);
    });
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(UserStats));
      });
  }

  beforeEach(createCmp);

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp:UserStats = cmpDebugElement.componentInstance;
    expect(cmp.userId).toEqual('1');
    expect(cmp.user).toBeTruthy();
    expect(cmp.user.id).toEqual(1);
    expect(cmp.user.email).toEqual('test1@test.com');
    expect(cmp.user.userStats.micropostCnt).toEqual(2);

    const gravatarDebugElement = cmpDebugElement.query(By.directive(Gravatar));
    expect(gravatarDebugElement).toBeTruthy();
    expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');
    expect(gravatarDebugElement.componentInstance.alt).toEqual('test1');

    const el = cmpDebugElement.nativeElement;
    const header = getDOM().querySelector(el, 'h2');
    expect(header.innerText).toMatch(/test1/);

    const profileLink = getDOM().querySelector(el, 'a.profile-link');
    expect(profileLink).toBeTruthy();
    expect(profileLink.getAttribute('href')).toEqual('/users/1');

    const postCnt = getDOM().querySelector(el, '.microposts');
    expect(postCnt).toBeTruthy();
    expect(postCnt.innerText).toMatch(/2 microposts/);

    const followingsLink = getDOM().querySelector(el, 'a.followings');
    expect(followingsLink).toBeTruthy();
    expect(followingsLink.getAttribute('href')).toEqual('/users/1/followings');
    expect(followingsLink.innerText).toMatch(/3[\s\S]*?followings/);

    const followersLink = getDOM().querySelector(el, 'a.followers');
    expect(followersLink).toBeTruthy();
    expect(followersLink.getAttribute('href')).toEqual('/users/1/followers');
    expect(followersLink.innerText).toMatch(/4[\s\S]*?followers/);
  });

  describe('when shown on profile', () => {
    beforeEach(() => {
      const cmp:UserStats = cmpDebugElement.componentInstance;
      cmp.shownOnProfile = true;
      ctx.fixture.detectChanges();
    });

    it('does not show profile link', () => {
      const profileLink = getDOM().querySelector(cmpDebugElement.nativeElement, 'a.profile-link');
      expect(profileLink).toBeFalsy();
    });

    it('does not show post counts', () => {
      const postCnt = getDOM().querySelector(cmpDebugElement.nativeElement, '.microposts');
      expect(postCnt).toBeFalsy();
    });
  });

});

@Component({
  selector: 'test-cmp',
  template: `<user-stats userId="1" [shownOnProfile]="false"></user-stats>`,
  directives: [UserStats],
})
class TestCmp {
}
