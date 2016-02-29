import {Component, View, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  expect,
  it
} from "angular2/testing";
import {ResponseOptions, Response} from "angular2/http";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {MicropostList, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";
import {MicropostService} from "app/services";

const dummyResponse = new Response(new ResponseOptions({
  body: JSON.stringify([
    {
      id: 1,
      content: 'content1',
      createdAt: 0,
      isMyPost: true,
      user: {
        id: 1,
        email: 'test1@test.com',
        name: 'test user1'
      },
    },
    {
      id: 2,
      content: 'content2',
      createdAt: 1234567,
      isMyPost: false,
      user: {
        id: 2,
        email: 'test2@test.com',
        name: 'test user2'
      },
    },
  ]),
}));

describe('MicropostList', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;
  var micropostService:MicropostService;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));
  beforeEach(inject([MicropostService], _ => {
    micropostService = _;
  }));
  beforeEach(() => jasmine.clock().mockDate(new Date(24 * 60 * 60 * 1000)));

  function createCmp(done) {
    ctx.backend.connections.subscribe(conn => {
      conn.mockRespond(dummyResponse);
    });
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(MicropostList));
        ctx.fixture.detectChanges();
      });
  }

  beforeEach(createCmp);

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can show list of posts', () => {
    const cmp:MicropostList = cmpDebugElement.componentInstance;
    expect(cmp.posts.length).toEqual(2);

    const el = cmpDebugElement.nativeElement;
    expect(DOM.querySelectorAll(el, 'li>.content').length).toEqual(2);

    const content = DOM.querySelector(el, '.content');
    expect(content).toHaveText('content1');

    const timestamp = DOM.querySelector(el, '.timestamp');
    expect(timestamp.innerText).toMatch(/1 day ago/);

    const deleteLinks = DOM.querySelectorAll(el, '.delete');
    expect(deleteLinks[0]).toBeTruthy();
    expect(deleteLinks[1]).toBeFalsy();
  });

  it('can load more', () => {
    const cmp:MicropostList = cmpDebugElement.componentInstance;
    const moreBtn = DOM.querySelector(cmpDebugElement.nativeElement, '.moreBtn');
    moreBtn.click();
    expect(cmp.posts.length).toEqual(4);
  });

  it('does not delete micropost when not confirmed', () => {
    const deleteLink = DOM.querySelector(cmpDebugElement.nativeElement, '.delete');
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(micropostService, 'delete');
    deleteLink.click();
    expect(micropostService.delete).not.toHaveBeenCalled();
  });

  it('deletes micropost when confirmed', () => {
    const cmp:MicropostList = cmpDebugElement.componentInstance;
    const deleteLink = DOM.querySelector(cmpDebugElement.nativeElement, '.delete');
    spyOn(window, 'confirm').and.returnValue(true);
    deleteLink.click();
    expect(cmp.posts.length).toEqual(1);
  });

});

@Component({selector: 'test-cmp'})
@View({
  template: `<micropost-list userId="1"></micropost-list>`,
  directives: [MicropostList],
})
class TestCmp {
}
