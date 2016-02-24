import {Component, View, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {
  beforeEachProviders,
  beforeEach,
  expect,
  describe,
  it
} from "angular2/testing";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {HomePage, UserStats, MicropostNew, Feed, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";

describe('HomePage', () => {

  var ctx:TestContext;

  var cmpDebugElement:DebugElement;
  var userStatsDebugElement:DebugElement;
  var micropostNewDebugElement:DebugElement;
  var feedDebugElement:DebugElement;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));

  function createCmp(done) {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(HomePage));
        if (!cmpDebugElement) return;
        userStatsDebugElement = cmpDebugElement.query(By.directive(UserStats));
        micropostNewDebugElement = cmpDebugElement.query(By.directive(MicropostNew));
        feedDebugElement = cmpDebugElement.query(By.directive(Feed));
      });
  }

  beforeEach(createCmp);

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    expect(userStatsDebugElement).toBeTruthy();
    expect(userStatsDebugElement.componentInstance.userId).toEqual('me');
    expect(micropostNewDebugElement).toBeTruthy();
    expect(feedDebugElement).toBeTruthy();
  });

  it('reload user stats when created new micropost', () => {
    const userStats:UserStats = userStatsDebugElement.componentInstance;
    spyOn(userStats, 'ngOnChanges');
    micropostNewDebugElement.triggerEventHandler('created', null);
    expect(userStats.ngOnChanges).toHaveBeenCalled();
  });

  it('reload feed when created new micropost', () => {
    const feed:Feed = feedDebugElement.componentInstance;
    spyOn(feed, 'list');
    micropostNewDebugElement.triggerEventHandler('created', null);
    expect(feed.list).toHaveBeenCalled();
  });

  it('reload user stats when deleted a micropost', () => {
    const userStats:UserStats = userStatsDebugElement.componentInstance;
    spyOn(userStats, 'ngOnChanges');
    feedDebugElement.triggerEventHandler('deleted', null);
    expect(userStats.ngOnChanges).toHaveBeenCalled();
  });
  
});

@Component({selector: 'test-cmp'})
@View({
  template: `<home-page></home-page>`,
  directives: [HomePage],
})
class TestCmp {
}
