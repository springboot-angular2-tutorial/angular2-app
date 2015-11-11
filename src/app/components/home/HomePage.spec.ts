const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Component, View, By, DebugElement} from 'angular2/angular2';
import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  xdescribe,
  it,
  iit,
} from 'angular2/testing';
import {DOM} from 'angular2/src/core/dom/dom_adapter';

import {HomePage, UserStats, MicropostNew, Feed} from 'app/components';
import {APP_TEST_PROVIDERS} from "app/bindings";
import {TestContext, createTestContext} from 'app/testing';

export function main() {
  describe('HomePage', () => {

    var ctx:TestContext;

    var cmpDebugElement:DebugElement;
    var userStatsDebugElement:DebugElement;
    var micropostNewDebugElement:DebugElement;
    var feedDebugElement:DebugElement;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(createTestContext(_ => ctx = _));

    function createCmp(done) {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(HomePage));
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
      spyOn(userStats, 'onChanges');
      micropostNewDebugElement.triggerEventHandler('created', null);
      expect(userStats.onChanges).toHaveBeenCalled();
    });

    it('reload feed when created new micropost', () => {
      const feed:Feed = feedDebugElement.componentInstance;
      spyOn(feed, 'list');
      micropostNewDebugElement.triggerEventHandler('created', null);
      expect(feed.list).toHaveBeenCalled();
    });

    it('reload user stats when deleted a micropost', () => {
      const userStats:UserStats = userStatsDebugElement.componentInstance;
      spyOn(userStats, 'onChanges');
      feedDebugElement.triggerEventHandler('deleted', null);
      expect(userStats.onChanges).toHaveBeenCalled();
    });
  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<home-page></home-page>`,
  directives: [HomePage],
})
class TestCmp {
}
