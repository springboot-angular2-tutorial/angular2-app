import {Component, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {beforeEachProviders, beforeEach} from "angular2/testing";
import {ResponseOptions, Response} from "angular2/http";
import {ROUTER_PRIMARY_COMPONENT, ROUTER_DIRECTIVES} from "angular2/router";
import {App, UserListPage, Gravatar, Pager} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext, signin} from "app/testing";

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

describe('UserListPage', () => {

  let ctx:TestContext;
  let cmpDebugElement:DebugElement;
  let pagerDebugElement:DebugElement;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));
  beforeEach(signin());
  beforeEach(done => {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
      }, e => console.error(e));
  });
  beforeEach(() => {
    ctx.backend.connections.subscribe(conn => {
      conn.mockRespond(dummyResponse);
    }, e => console.error(e));
  });
  beforeEach(done => {
    ctx.router.navigate(['/UserList']).then(() => {
      ctx.fixture.detectChanges();
      cmpDebugElement = ctx.fixture.debugElement.query(By.directive(UserListPage));
      pagerDebugElement = cmpDebugElement.query(By.directive(Pager));
      done();
    }).catch(e => console.error(e));
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
    expect(DOM.querySelectorAll(el, 'li>a')[0].innerText).toEqual('test1');
    expect(DOM.querySelectorAll(el, 'li>a')[1].innerText).toEqual('test2');

    const gravatarDebugElement = cmpDebugElement.query(By.directive(Gravatar));
    expect(gravatarDebugElement).toBeTruthy();
    expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');
    expect(gravatarDebugElement.componentInstance.alt).toEqual('test1');

    const userShowLink = cmpDebugElement.query(By.css('li>a')).nativeElement;
    expect(userShowLink.getAttribute('href')).toEqual('/users/1');

    const pager:Pager = pagerDebugElement.componentInstance;
    expect(pager.totalPages).toEqual(1);
  });

  it('list another page when page was changed', (done) => {
    pagerDebugElement.triggerEventHandler('pageChanged', <any>{page: 2});
    ctx.router.subscribe(() => {
      cmpDebugElement = ctx.fixture.debugElement.query(By.directive(UserListPage));
      const cmp:UserListPage = cmpDebugElement.componentInstance;
      expect(cmp.page).toEqual(2);
      done();
    });
  });

});

@Component({
  selector: 'test-cmp',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
})
class TestCmp {
}
