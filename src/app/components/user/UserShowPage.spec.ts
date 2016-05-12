import {Component, provide, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {
  RouteParams,
  ROUTER_PRIMARY_COMPONENT
} from "@angular/router-deprecated";
import {
  App,
  UserShowPage,
  UserStats,
  FollowBtn,
  MicropostList
} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";
import {UserService} from "app/services";
import {Observable} from "rxjs/Observable";

describe('UserShowPage', () => {

  var ctx:TestContext;

  var cmpDebugElement:DebugElement;
  var userStatsDebugElement:DebugElement;
  var followBtnDebugElement:DebugElement;
  var micropostListDebugElement:DebugElement;

  var routeParams:RouteParams;

  beforeEachProviders(() => {
    routeParams = jasmine.createSpyObj('routeParams', ['get']);
    (<jasmine.Spy>routeParams.get).and.returnValue('1');
    return [
      APP_TEST_PROVIDERS,
      provide(RouteParams, {useValue: routeParams}),
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
    ];
  });
  beforeEach(createTestContext(_ => ctx = _));
  // required to show FollowBtn
  beforeEach(inject([UserService], userService => {
    spyOn(userService, 'get').and.returnValue(Observable.empty());
  }));
  beforeEach(done => {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(UserShowPage));
        userStatsDebugElement = cmpDebugElement.query(By.directive(UserStats));
        followBtnDebugElement = cmpDebugElement.query(By.directive(FollowBtn));
        micropostListDebugElement = cmpDebugElement.query(By.directive(MicropostList));
      });
  });

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    expect(userStatsDebugElement).toBeTruthy();
    expect(userStatsDebugElement.componentInstance.userId).toEqual('1');
    expect(micropostListDebugElement).toBeTruthy();
    expect(micropostListDebugElement.componentInstance.userId).toEqual('1');
    expect(followBtnDebugElement).toBeTruthy();
    expect(followBtnDebugElement.componentInstance.followerId).toEqual('1');
  });

  it('reload user stats when following status was updated', () => {
    const userStats:UserStats = userStatsDebugElement.componentInstance;
    spyOn(userStats, 'ngOnChanges');
    followBtnDebugElement.triggerEventHandler('updated', null);
    expect(userStats.ngOnChanges).toHaveBeenCalled();
  });

});

@Component({
  selector: 'test-cmp',
  template: `<user-show-page></user-show-page>`,
  directives: [UserShowPage],
})
class TestCmp {
}
