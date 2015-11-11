const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Component, View, By, provide, DebugElement} from 'angular2/angular2';
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
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {RouteParams} from 'angular2/router';

import {FollowingListPage, UserStats} from 'app/components';
import {APP_TEST_PROVIDERS} from 'app/bindings';
import {TestContext, createTestContext, signin} from 'app/testing';
import {UserList} from './UserList';

export function main() {
  describe('FollowingListPage', () => {

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
      ]
    });
    beforeEach(createTestContext(_  => ctx = _));
    beforeEach(done => {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(FollowingListPage));
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
  template: `<following-list-page></following-list-page>`,
  directives: [FollowingListPage],
})
class TestCmp {
}
