const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Component, View, By, provide, DebugElement} from 'angular2/angular2';
import {
  RootTestComponent,
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  xit,
  iit,
} from 'angular2/testing';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {ResponseOptions, Response} from 'angular2/http';

import {App, UserListPage, Gravatar} from 'app/components';
import {APP_TEST_PROVIDERS} from "app/bindings";
import {TestContext, createTestContext} from 'app/testing';

const dummyResponse = new Response(new ResponseOptions({
  body: JSON.stringify({
    content: [
      {id: 1, email: 'test1@test.com', name: 'test1'},
      {id: 2, email: 'test2@test.com', name: 'test2'},
    ],
    totalPages: 1,
    totalElements: 2,
  }),
}));

export function main() {
  describe('UserListPage', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(createTestContext(_ => ctx = _));
    beforeEach(done => {
      ctx.backend.connections.subscribe(conn => {
        conn.mockRespond(dummyResponse);
      });
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(UserListPage));
        });
    });

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
    });

    it('can list users', () => {
      ctx.rootTC.detectChanges();

      const page:UserListPage = cmpDebugElement.componentInstance;
      expect(page.users.length).toEqual(2);
      expect(page.totalPages).toEqual(1);
      expect(page.totalItems).toEqual(2);

      const el = cmpDebugElement.nativeElement;
      expect(DOM.querySelectorAll(el, 'li>a')[0]).toHaveText('test1');
      expect(DOM.querySelectorAll(el, 'li>a')[1]).toHaveText('test2');

      const gravatarDebugElement = cmpDebugElement.query(By.directive(Gravatar));
      expect(gravatarDebugElement).toBeTruthy();
      expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');
      expect(gravatarDebugElement.componentInstance.alt).toEqual('test1');

      const userShowLink = cmpDebugElement.query(By.css('li>a')).nativeElement;
      expect(userShowLink.getAttribute('href')).toEqual('/users/1');
    });

  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<user-list-page></user-list-page>`,
  directives: [UserListPage],
})
class TestCmp {
}
