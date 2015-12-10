import {DOM, Component, View, By, provide, DebugElement} from 'angular2/angular2';
import {
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
import {ResponseOptions, Response} from 'angular2/http';
import {ROUTER_PRIMARY_COMPONENT} from 'angular2/router';

import {App, UserListPage, Gravatar, Pager} from 'app/components';
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
    var pagerDebugElement:DebugElement;

    beforeEachProviders(() => [
      APP_TEST_PROVIDERS,
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
    ]);
    beforeEach(createTestContext(_ => ctx = _));
    beforeEach(done => {
      ctx.backend.connections.subscribe(conn => {
        conn.mockRespond(dummyResponse);
      });
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(UserListPage));
          pagerDebugElement = rootTC.debugElement.query(By.directive(Pager));
        });
    });

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
      expect(pagerDebugElement).toBeTruthy();
    });

    it('can list users', () => {
      ctx.fixture.detectChanges();

      const page:UserListPage = cmpDebugElement.componentInstance;
      expect(page.users.length).toEqual(2);
      expect(page.totalPages).toEqual(1);

      const el = cmpDebugElement.nativeElement;
      expect(DOM.querySelectorAll(el, 'li>a')[0]).toHaveText('test1');
      expect(DOM.querySelectorAll(el, 'li>a')[1]).toHaveText('test2');

      const gravatarDebugElement = cmpDebugElement.query(By.directive(Gravatar));
      expect(gravatarDebugElement).toBeTruthy();
      expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');
      expect(gravatarDebugElement.componentInstance.alt).toEqual('test1');

      const userShowLink = cmpDebugElement.query(By.css('li>a')).nativeElement;
      expect(userShowLink.getAttribute('href')).toEqual('/users/1');

      const pager:Pager = pagerDebugElement.componentInstance;
      expect(pager.totalPages).toEqual(1);
    });

    it('list another page when page was changed', () => {
      const cmp:UserListPage = cmpDebugElement.componentInstance;
      spyOn(cmp, 'list');
      pagerDebugElement.triggerEventHandler('pageChanged', <any>{page: 2});
      expect(cmp.list).toHaveBeenCalledWith(2);
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
