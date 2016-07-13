import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {inject, async, addProviders} from "@angular/core/testing";
import {ResponseOptions, Response} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {UserStatsComponent} from "./user-stats.component";
import {GravatarComponent} from "../../../shared/components";
import {provideFakeRouter} from "../../routes/router-testing-providers";
import {APP_TEST_HTTP_PROVIDERS} from "../../http/index";
import {APP_SERVICE_PROVIDERS} from "../../services/index";

describe('UserStatsComponent', () => {

  @Component({
    template: `<mpt-user-stats userId="1" [shownOnProfile]="false"></mpt-user-stats>`,
    directives: [UserStatsComponent],
  })
  class TestComponent {
  }

  let cmpDebugElement:DebugElement;

  let backend:MockBackend;
  let fixture:ComponentFixture<any>;

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

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent),
    ...APP_TEST_HTTP_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
  ]));
  beforeEach(inject([MockBackend], (..._) => {
    [backend] = _;
    backend.connections.subscribe(conn => conn.mockRespond(dummyResponse));
  }));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then(_ => {
        fixture = _;
        cmpDebugElement = fixture.debugElement.query(By.directive(UserStatsComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp:UserStatsComponent = cmpDebugElement.componentInstance;
    expect(cmp.userId).toEqual('1');
    expect(cmp.user).toBeTruthy();
    expect(cmp.user.id).toEqual(1);
    expect(cmp.user.email).toEqual('test1@test.com');
    expect(cmp.user.userStats.micropostCnt).toEqual(2);

    const gravatarDebugElement = cmpDebugElement.query(By.directive(GravatarComponent));
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
      const cmp:UserStatsComponent = cmpDebugElement.componentInstance;
      cmp.shownOnProfile = true;
      fixture.detectChanges();
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
