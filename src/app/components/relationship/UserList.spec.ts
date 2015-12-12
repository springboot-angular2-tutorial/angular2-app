import {Observable} from 'rxjs/Observable';

import {
  Component,
  View,
  By,
  DebugElement,
  provide,
  DOM,
} from 'angular2/angular2';
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
import {ResponseOptions, Response} from 'angular2/http';
import {RouteParams, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {ObservableWrapper} from "angular2/src/facade/async";

import {Gravatar, App, Pager} from "app/components";
import {UserList} from './UserList';
import {APP_TEST_PROVIDERS} from "app/bindings";
import {TestContext, createTestContext, signin} from 'app/testing';
import {User, Page, PageRequest} from "app/interfaces";

export function main() {
  describe('relationship.UserList', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;
    var pagerDebugElement:DebugElement;

    beforeEachProviders(() => [
      APP_TEST_PROVIDERS,
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
    ]);
    beforeEach(createTestContext(_ => ctx = _));

    function createCmp(done) {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(() => {
          cmpDebugElement = ctx.fixture.debugElement.query(By.directive(UserList));
          pagerDebugElement = cmpDebugElement.query(By.directive(Pager));
        });
    }

    beforeEach(createCmp);

    it('can be shown', () => {
      ctx.fixture.detectChanges();

      expect(cmpDebugElement).toBeTruthy();
      expect(pagerDebugElement).toBeTruthy();

      const cmp:UserList = cmpDebugElement.componentInstance;
      expect(cmp.users.length).toEqual(2);
      expect(cmp.totalPages).toEqual(1);

      expect(DOM.querySelectorAll(cmpDebugElement.nativeElement, '.users>li').length).toEqual(2);

      const gravatarDebugElement = cmpDebugElement.query(By.directive(Gravatar));
      expect(gravatarDebugElement).toBeTruthy();
      expect(gravatarDebugElement.componentInstance.alt).toEqual('test1');
      expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');

      const userLink:HTMLElement = cmpDebugElement.query(By.css('.users>li>a')).nativeElement;
      expect(userLink).toHaveText('test1');
      expect(userLink.getAttribute('href')).toEqual('/users/1');
    });

    it('list another page when page was changed', () => {
      const cmp:UserList= cmpDebugElement.componentInstance;
      spyOn(cmp, 'list');
      pagerDebugElement.triggerEventHandler('pageChanged', <any>{page: 2});
      expect(cmp.list).toHaveBeenCalledWith(2);
    });

  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<user-list [listProvider]="listProvider"></user-list>`,
  directives: [UserList],
})
class TestCmp {

  listProvider:(pageRequest:PageRequest) => Observable<Page<User>>;

  constructor() {
    this.listProvider = () => {
      return Observable.of({
        content: [
          {id: 1, email: 'test1@test.com', name: 'test1'},
          {id: 2, email: 'test2@test.com', name: 'test2'},
        ],
        totalPages: 1,
        totalElements: 2,
      });
    };
  }

}
