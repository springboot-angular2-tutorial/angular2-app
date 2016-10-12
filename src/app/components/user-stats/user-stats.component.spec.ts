import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {
  inject,
  ComponentFixture,
  TestBed,
  fakeAsync
} from "@angular/core/testing";
import {ResponseOptions, Response} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {UserStatsComponent} from "./user-stats.component";
import {RouterTestingModule} from "@angular/router/testing";
import {UserStatsModule} from "./user-stats.module";
import {CoreModule} from "../../core/core.module";
import {APP_TEST_HTTP_PROVIDERS} from "../../../testing";
import {GravatarComponent} from "../../shared/gravatar/gravatar.component";

describe('UserStatsComponent', () => {

  @Component({
    template: `<mpt-user-stats [userId]="1" [shownOnProfile]="false"></mpt-user-stats>`,
  })
  class TestComponent {
  }

  let cmpDebugElement: DebugElement;

  let backend: MockBackend;
  let fixture: ComponentFixture<any>;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        UserStatsModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
      ]
    });
  });
  beforeEach(inject([MockBackend], (..._) => {
    [backend] = _;
    backend.connections.subscribe(conn => conn.mockRespond(dummyResponse));
  }));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(UserStatsComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp: UserStatsComponent = cmpDebugElement.componentInstance;
    expect(cmp.userId).toEqual(1);
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
      const cmp: UserStatsComponent = cmpDebugElement.componentInstance;
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
