import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, async, addProviders} from "@angular/core/testing";
import {Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {FollowBtnComponent} from "./follow-btn.component";
import {FollowBtnService} from "./follow-btn.service";
import {APP_TEST_HTTP_PROVIDERS} from "../../http/index";
import {APP_SERVICE_PROVIDERS} from "../../services/index";
import {provideFakeRouter} from "../../routes/router-testing-providers";

describe('FollowBtnComponent', () => {

  @Component({
    template: `<mpt-follow-btn followerId="1" (updated)="doSomething()"></mpt-follow-btn>`,
    directives: [FollowBtnComponent],
  })
  class TestComponent {
    doSomething() {
    }
  }

  let cmpDebugElement:DebugElement;
  let testCmpDebugElement:DebugElement;

  let followBtnService:FollowBtnService;

  const notSignedInResponse = new Response(new ResponseOptions({
    body: JSON.stringify({
      id: 1,
      email: "test@test.com",
      isMyself: null,
      userStats: {
        followedByMe: false,
      }
    })
  }));

  const mySelfResponse = new Response(new ResponseOptions({
    body: JSON.stringify({
      id: 1,
      email: "test@test.com",
      isMyself: true,
      userStats: {
        followedByMe: false,
      }
    })
  }));

  const followingResponse = new Response(new ResponseOptions({
    body: JSON.stringify({
      id: 1,
      email: "test@test.com",
      isMyself: false,
      userStats: {
        followedByMe: true,
      }
    })
  }));

  const notFollowingResponse = new Response(new ResponseOptions({
    body: JSON.stringify({
      id: 1,
      email: "test@test.com",
      isMyself: false,
      userStats: {
        followedByMe: false,
      }
    })
  }));


  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent),
    ...APP_TEST_HTTP_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
    FollowBtnService,
  ]));
  beforeEach(inject([FollowBtnService], _ => {
    followBtnService = _;
    spyOn(followBtnService, 'follow').and.callThrough();
    spyOn(followBtnService, 'unfollow').and.callThrough();
  }));

  const mockBackendBy = (response:Response) => {
    return inject([MockBackend], (backend:MockBackend) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(response);
      });
    });
  };

  const initComponent = () => {
    return async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      tcb
        .overrideProviders(FollowBtnComponent, [
          {provide: FollowBtnService, useValue: followBtnService}
        ])
        .createAsync(TestComponent)
        .then((fixture:ComponentFixture<any>) => {
          testCmpDebugElement = fixture.debugElement;
          cmpDebugElement = testCmpDebugElement.query(By.directive(FollowBtnComponent));
          fixture.detectChanges();
        });
    }));
  };

  describe('when not signed in', () => {
    beforeEach(mockBackendBy(notSignedInResponse));
    beforeEach(initComponent());
    it('should not show any button', () => {
      expect(cmpDebugElement).toBeTruthy();
      const followBtn = cmpDebugElement.query(By.css('button'));
      expect(followBtn).toBeNull();
    });
  });

  describe('when showing myself', () => {
    beforeEach(mockBackendBy(mySelfResponse));
    beforeEach(initComponent());
    it('should not show any button', () => {
      expect(cmpDebugElement).toBeTruthy();
      const followBtn = cmpDebugElement.query(By.css('button'));
      expect(followBtn).toBeNull();
    });
  });

  describe('when following the user', () => {
    beforeEach(mockBackendBy(followingResponse));
    beforeEach(initComponent());
    it('should show an unfollow button', () => {
      expect(cmpDebugElement).toBeTruthy();
      const unfollowBtn = cmpDebugElement.query(By.css('button'));
      expect(unfollowBtn).toBeTruthy();
      expect(unfollowBtn.nativeElement.innerText).toEqual('Unfollow');
    });

    it('can unfollow the user', () => {
      const cmp:FollowBtnComponent = cmpDebugElement.componentInstance;
      const testCmp:TestComponent = testCmpDebugElement.componentInstance;
      spyOn(testCmp, 'doSomething');
      const unfollowBtn = cmpDebugElement.query(By.css('button'));
      unfollowBtn.nativeElement.click();
      expect(cmp.canShowFollowBtn).toBeTruthy();
      expect(cmp.canShowUnfollowBtn).toBeFalsy();
      expect(followBtnService.unfollow).toHaveBeenCalledWith('1');
      expect(testCmp.doSomething).toHaveBeenCalled();
    });
  });

  describe('when not following the user', () => {
    beforeEach(mockBackendBy(notFollowingResponse));
    beforeEach(initComponent());
    it('should show a follow button', () => {
      expect(cmpDebugElement).toBeTruthy();
      const followBtn = cmpDebugElement.query(By.css('button'));
      expect(followBtn).toBeTruthy();
      expect(followBtn.nativeElement.innerText).toEqual('Follow');
    });

    it('can follow the user', () => {
      const cmp:FollowBtnComponent = cmpDebugElement.componentInstance;
      const testCmp:TestComponent = testCmpDebugElement.componentInstance;
      spyOn(testCmp, 'doSomething');
      const followBtn = cmpDebugElement.query(By.css('button'));
      followBtn.nativeElement.click();
      expect(cmp.canShowFollowBtn).toBeFalsy();
      expect(cmp.canShowUnfollowBtn).toBeTruthy();
      expect(followBtnService.follow).toHaveBeenCalledWith('1');
      expect(testCmp.doSomething).toHaveBeenCalled();
    });
  });

});
