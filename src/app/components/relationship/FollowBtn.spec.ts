import {Component, View, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {
  beforeEachProviders,
  beforeEach,
  expect,
  inject
} from "angular2/testing";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {FollowBtn, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";
import {RelationshipService} from "app/services";
import {Response, ResponseOptions} from "angular2/http";

describe('FollowBtn', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;
  var relationshipService:RelationshipService;

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
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));
  beforeEach(inject([RelationshipService], _ => {
    relationshipService = _;
    spyOn(relationshipService, 'follow').and.callThrough();
    spyOn(relationshipService, 'unfollow').and.callThrough();
  }));

  const createCmp = (dummyResponse) => (done) => {
    ctx.backend.connections.subscribe(conn => {
      conn.mockRespond(dummyResponse);
    });
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(FollowBtn));
      });
  };

  describe('when not signed in', () => {
    beforeEach(createCmp(notSignedInResponse));
    it('should not show any button', () => {
      expect(cmpDebugElement).toBeTruthy();
      const followBtn = cmpDebugElement.query(By.css('.follow-btn'));
      expect(followBtn).toBeNull();
    });
  });

  describe('when showing myself', () => {
    beforeEach(createCmp(mySelfResponse));
    it('should not show any button', () => {
      expect(cmpDebugElement).toBeTruthy();
      const followBtn = cmpDebugElement.query(By.css('.follow-btn'));
      expect(followBtn).toBeNull();
    });
  });

  describe('when following the user', () => {
    beforeEach(createCmp(followingResponse));
    it('should show an unfollow button', () => {
      expect(cmpDebugElement).toBeTruthy();
      const unfollowBtn = cmpDebugElement.query(By.css('.follow-btn'));
      expect(unfollowBtn).toBeTruthy();
      expect(unfollowBtn.nativeElement).toHaveText('Unfollow');
    });

    it('can unfollow the user', () => {
      const cmp:FollowBtn = cmpDebugElement.componentInstance;
      const unfollowBtn = cmpDebugElement.query(By.css('.follow-btn'));
      unfollowBtn.nativeElement.click();
      expect(cmp.canShowFollowBtn).toBeTruthy();
      expect(cmp.canShowUnfollowBtn).toBeFalsy();
      expect(relationshipService.unfollow).toHaveBeenCalledWith('1');
    });
  });

  describe('when not following the user', () => {
    beforeEach(createCmp(notFollowingResponse));
    it('should show a follow button', () => {
      expect(cmpDebugElement).toBeTruthy();
      const followBtn = cmpDebugElement.query(By.css('.follow-btn'));
      expect(followBtn).toBeTruthy();
      expect(followBtn.nativeElement).toHaveText('Follow');
    });

    it('can follow the user', () => {
      const cmp:FollowBtn = cmpDebugElement.componentInstance;
      const followBtn = cmpDebugElement.query(By.css('.follow-btn'));
      followBtn.nativeElement.click();
      expect(cmp.canShowFollowBtn).toBeFalsy();
      expect(cmp.canShowUnfollowBtn).toBeTruthy();
      expect(relationshipService.follow).toHaveBeenCalledWith('1');
    });
  });

});

@Component({selector: 'test-cmp'})
@View({
  template: `<follow-btn followerId="1"></follow-btn>`,
  directives: [FollowBtn],
})
class TestCmp {
}
