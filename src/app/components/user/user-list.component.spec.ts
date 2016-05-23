import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {
  beforeEachProviders,
  beforeEach,
  inject,
  async
} from "@angular/core/testing";
import {ResponseOptions, Response} from "@angular/http";
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {MockBackend} from "@angular/http/testing";
import {UserListComponent} from "./user-list.component";
import {APP_TEST_PROVIDERS} from "../../index";
import {GravatarComponent, PagerComponent} from "../../../shared/components";
import {login, prepareAppInjector} from "../../../shared/testing";

describe('UserListComponent', () => {

  let cmpDebugElement:DebugElement;
  let pagerDebugElement:DebugElement;

  let router:Router;
  let backend:MockBackend;
  let fixture:ComponentFixture<any>;

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

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(prepareAppInjector());
  beforeEach(inject([Router, MockBackend], (..._) => {
    [router, backend] = _;
    backend.connections.subscribe(conn => conn.mockRespond(dummyResponse));
  }));
  beforeEach(login());
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((_fixture:ComponentFixture<any>) => {
        fixture = _fixture;
        return router.navigate(['/UserList']).then(() => {
          cmpDebugElement = _fixture.debugElement.query(By.directive(UserListComponent));
          pagerDebugElement = cmpDebugElement.query(By.directive(PagerComponent));
          _fixture.detectChanges();
        });
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    expect(pagerDebugElement).toBeTruthy();
  });

  it('can list users', () => {
    const page:UserListComponent = cmpDebugElement.componentInstance;
    expect(page.users.length).toEqual(2);
    expect(page.totalPages).toEqual(1);

    const el = cmpDebugElement.nativeElement;
    expect(getDOM().querySelectorAll(el, 'li>a')[0].innerText).toEqual('test1');
    expect(getDOM().querySelectorAll(el, 'li>a')[1].innerText).toEqual('test2');

    const gravatarDebugElement = cmpDebugElement.query(By.directive(GravatarComponent));
    expect(gravatarDebugElement).toBeTruthy();
    expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');
    expect(gravatarDebugElement.componentInstance.alt).toEqual('test1');

    const userShowLink = cmpDebugElement.query(By.css('li>a')).nativeElement;
    expect(userShowLink.getAttribute('href')).toEqual('/users/1');

    const pager:PagerComponent = pagerDebugElement.componentInstance;
    expect(pager.totalPages).toEqual(1);
  });

  it('list another page when page was changed', (done) => {
    pagerDebugElement.triggerEventHandler('pageChanged', <any>{page: 2});
    router.subscribe(() => {
      cmpDebugElement = fixture.debugElement.query(By.directive(UserListComponent));
      const cmp:UserListComponent = cmpDebugElement.componentInstance;
      expect(cmp.page).toEqual(2);
      done();
    });
  });

});

@Component({
  selector: 'mpt-test',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
})
class TestComponent {
}
