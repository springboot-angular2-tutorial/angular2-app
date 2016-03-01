import {Observable} from "rxjs/Observable";
import {Component, View, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {beforeEachProviders, beforeEach} from "angular2/testing";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {Gravatar, App} from "app/components";
import {UserList} from "./UserList";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";
import {RelatedUser} from "app/interfaces";

describe('relationship.UserList', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;

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
      });
  }

  beforeEach(createCmp);

  it('can be shown', () => {
    ctx.fixture.detectChanges();

    expect(cmpDebugElement).toBeTruthy();

    const cmp:UserList = cmpDebugElement.componentInstance;
    expect(cmp.users.length).toEqual(2);

    expect(DOM.querySelectorAll(cmpDebugElement.nativeElement, '.users>li').length).toEqual(2);

    const gravatarDebugElement = cmpDebugElement.query(By.directive(Gravatar));
    expect(gravatarDebugElement).toBeTruthy();
    expect(gravatarDebugElement.componentInstance.alt).toEqual('test1');
    expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');

    const userLink:HTMLElement = cmpDebugElement.query(By.css('.users>li>a')).nativeElement;
    expect(userLink.innerText).toEqual('test1');
    expect(userLink.getAttribute('href')).toEqual('/users/1');
  });

  it('can load more', () => {
    const cmp:UserList = cmpDebugElement.componentInstance;
    const moreBtn = DOM.querySelector(cmpDebugElement.nativeElement, '.moreBtn');
    spyOn(cmp, 'listProvider').and.callThrough();
    moreBtn.click();
    expect(cmp.users.length).toEqual(4);
    expect(cmp.listProvider).toHaveBeenCalledWith({maxId: 100, count: 5});
  });

});

@Component({selector: 'test-cmp'})
@View({
  template: `<user-list [listProvider]="listProvider"></user-list>`,
  directives: [UserList],
})
class TestCmp {
  listProvider:(params:any) => Observable<RelatedUser[]>;

  constructor() {
    this.listProvider = () => {
      return Observable.of([
        {id: 1, email: 'test1@test.com', name: 'test1', relationshipId: 1},
        {id: 2, email: 'test2@test.com', name: 'test2', relationshipId: 100},
      ]);
    };
  }
}
