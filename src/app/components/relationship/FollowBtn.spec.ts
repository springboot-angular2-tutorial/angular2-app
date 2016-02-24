import {Component, View, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  expect,
  describe,
  it
} from "angular2/testing";
import {Response, BaseResponseOptions} from "angular2/http";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {FollowBtn, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";
import {RelationshipService, UserService} from "app/services";

describe('FollowBtn', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;
  var relationshipService:RelationshipService;
  var userService:UserService;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));
  beforeEach(inject([RelationshipService, UserService], (..._) => {
    [relationshipService, userService] = _;
    spyOn(relationshipService, 'follow').and.callThrough();
    spyOn(relationshipService, 'unfollow').and.callThrough();
    spyOn(userService, 'get').and.callThrough();
  }));
  beforeEach(done => {
    ctx.backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new BaseResponseOptions()));
    });
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(FollowBtn));
      });
  });

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    const cmp:FollowBtn = cmpDebugElement.componentInstance;
    expect(cmp.followerId).toEqual('1');
    expect(cmp.busy).toBeFalsy();
    expect(userService.get).toHaveBeenCalledWith('1');
  });

  it('can unfollow', () => {
    const cmp:FollowBtn = cmpDebugElement.componentInstance;
    cmp.isFollowedByMe = true;
    ctx.fixture.detectChanges();

    const unfollowBtn = cmpDebugElement.query(By.css('.follow-btn')).nativeElement;
    expect(unfollowBtn).toHaveText('Unfollow');

    unfollowBtn.click();
    expect(cmp.isFollowedByMe).toBeFalsy();
    expect(relationshipService.unfollow).toHaveBeenCalledWith('1');
  });

  it('can follow', () => {
    const cmp:FollowBtn = cmpDebugElement.componentInstance;
    cmp.isFollowedByMe = false;
    ctx.fixture.detectChanges();

    const followBtn = cmpDebugElement.query(By.css('.follow-btn')).nativeElement;
    expect(followBtn).toHaveText('Follow');

    followBtn.click();
    expect(cmp.isFollowedByMe).toBeTruthy();
    expect(relationshipService.follow).toHaveBeenCalledWith('1');
  });

});

@Component({selector: 'test-cmp'})
@View({
  template: `<follow-btn followerId="1"></follow-btn>`,
  directives: [FollowBtn],
})
class TestCmp {
}
