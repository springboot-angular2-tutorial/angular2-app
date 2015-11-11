const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Component, View, By, DebugElement, provide} from 'angular2/angular2';
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
import {ResponseOptions, Response} from 'angular2/http';
import {RouteParams} from 'angular2/router';

import {App, UserShowPage, UserStats, FollowBtn, MicropostList} from 'app/components';
import {APP_TEST_PROVIDERS} from "app/bindings";
import {TestContext, createTestContext, signin} from 'app/testing';

export function main() {
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
      ]
    });
    beforeEach(createTestContext(_ => ctx = _));

    function createCmp(done) {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(UserShowPage));
          userStatsDebugElement = cmpDebugElement.query(By.directive(UserStats));
          followBtnDebugElement = cmpDebugElement.query(By.directive(FollowBtn));
          micropostListDebugElement = cmpDebugElement.query(By.directive(MicropostList));
        });
    }

    describe('when not signed in', () => {
      beforeEach(createCmp);

      it('can be shown', () => {
        expect(cmpDebugElement).toBeTruthy();
        expect(userStatsDebugElement).toBeTruthy();
        expect(userStatsDebugElement.componentInstance.userId).toEqual('1');
        expect(micropostListDebugElement).toBeTruthy();
        expect(micropostListDebugElement.componentInstance.userId).toEqual('1');
      });

      it('does not show follow button', () => {
        expect(followBtnDebugElement).toBeNull();
      })
    }); // when not signed in

    describe('when signed in and it is my own page', () => {
      beforeEach(signin({id: 1, email: 'test@test.com'}));
      beforeEach(createCmp);

      it('can be shown', () => {
        expect(cmpDebugElement).toBeTruthy();
      });

      it('does not show follow button', () => {
        expect(followBtnDebugElement).toBeNull();
      });
    }); // when signed in and it is my own page

    describe('when signed in and it is not my own page', () => {
      beforeEach(signin({id: 2, email: 'test@test.com'}));
      beforeEach(createCmp);

      it('can be shown', () => {
        expect(cmpDebugElement).toBeTruthy();
      });

      it('shows follow button', () => {
        expect(followBtnDebugElement).toBeTruthy();
        expect(followBtnDebugElement.componentInstance.followerId).toEqual('1');
      });
    }); // when signed in and it is not my own page

  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<user-show-page></user-show-page>`,
  directives: [UserShowPage],
})
class TestCmp {
}
