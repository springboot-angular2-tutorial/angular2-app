import {Component, View, provide, DebugElement} from 'angular2/core';
import {By} from 'angular2/platform/common_dom';
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  iit,
} from 'angular2/testing';
import {RouteParams, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';

import {FollowerListPage, UserStats, App} from 'app/components';
import {APP_TEST_PROVIDERS} from 'app/providers';
import {TestContext, createTestContext} from 'app/testing';
import {UserList} from './UserList';

export function main() {
  describe('FollowerListPage', () => {

    var ctx:TestContext;

    var cmpDebugElement:DebugElement;
    var userStatsDebugElement:DebugElement;
    var userListDebugElement:DebugElement;

    var routeParams:RouteParams;

    beforeEachProviders(() => {
      routeParams = jasmine.createSpyObj('routeParams', ['get']);
      (<jasmine.Spy>routeParams.get).and.returnValue('1');
      return [
        APP_TEST_PROVIDERS,
        provide(RouteParams, {useValue: routeParams}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
      ]
    });
    beforeEach(createTestContext(_  => ctx = _));

    beforeEach(done => {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(() => {
          cmpDebugElement = ctx.fixture.debugElement.query(By.directive(FollowerListPage));
          if (!cmpDebugElement) return;
          userStatsDebugElement = cmpDebugElement.query(By.directive(UserStats));
          userListDebugElement = cmpDebugElement.query(By.directive(UserList));
        });
    });

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
      expect(routeParams.get).toHaveBeenCalledWith('id');
      expect(cmpDebugElement.componentInstance.userId).toEqual('1');
      expect(cmpDebugElement.componentInstance.listProvider).toBeTruthy();
      expect(userStatsDebugElement).toBeTruthy();
      expect(userStatsDebugElement.componentInstance.userId).toEqual('1');
      expect(userListDebugElement).toBeTruthy();
      expect(userListDebugElement.componentInstance.listProvider).toBeTruthy();
    });

  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<follower-list-page></follower-list-page>`,
  directives: [FollowerListPage],
})
class TestCmp {
}
