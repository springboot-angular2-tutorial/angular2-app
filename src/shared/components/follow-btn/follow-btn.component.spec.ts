import {Component, provide, DebugElement, EventEmitter} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  async
} from "@angular/core/testing";
import {Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {ObservableWrapper} from "@angular/common/src/facade/async";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {FollowBtnComponent} from "./follow-btn.component";
import {FollowBtnService} from "./follow-btn.service";
import {prepareAppInjector} from "../../testing";
import {APP_TEST_PROVIDERS} from "../../../app";

describe('FollowBtnComponent', () => {

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

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    FollowBtnService,
  ]);
  beforeEach(prepareAppInjector());
  beforeEach(inject([FollowBtnService], _ => {
    followBtnService = _;
    spyOn(followBtnService, 'follow').and.callThrough();
    spyOn(followBtnService, 'unfollow').and.callThrough();
  }));

  const mockBackendBy = (response:Response):Function => {
    return inject([MockBackend], (backend:MockBackend) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(response);
      });
    });
  };

  const initComponent = ():Function => {
    return async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      tcb
        .overrideProviders(FollowBtnComponent, [
          provide(FollowBtnService, {useValue: followBtnService})
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

    it('can unfollow the user', (done) => {
      const cmp:FollowBtnComponent = cmpDebugElement.componentInstance;
      const testCmp:TestComponent = testCmpDebugElement.componentInstance;
      const unfollowBtn = cmpDebugElement.query(By.css('button'));
      unfollowBtn.nativeElement.click();
      expect(cmp.canShowFollowBtn).toBeTruthy();
      expect(cmp.canShowUnfollowBtn).toBeFalsy();
      expect(followBtnService.unfollow).toHaveBeenCalledWith('1');
      ObservableWrapper.subscribe(testCmp.doneSomething, done);
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

    it('can follow the user', (done) => {
      const cmp:FollowBtnComponent = cmpDebugElement.componentInstance;
      const testCmp:TestComponent = testCmpDebugElement.componentInstance;
      const followBtn = cmpDebugElement.query(By.css('button'));
      followBtn.nativeElement.click();
      expect(cmp.canShowFollowBtn).toBeFalsy();
      expect(cmp.canShowUnfollowBtn).toBeTruthy();
      expect(followBtnService.follow).toHaveBeenCalledWith('1');
      ObservableWrapper.subscribe(testCmp.doneSomething, done);
    });
  });

});

@Component({
  template: `<mpt-follow-btn followerId="1" (updated)="doSomething()"></mpt-follow-btn>`,
  directives: [FollowBtnComponent],
})
class TestComponent {
  doneSomething:EventEmitter<any> = new EventEmitter();

  doSomething() {
    this.doneSomething.emit({});
  }
}
