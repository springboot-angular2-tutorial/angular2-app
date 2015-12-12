import {provide, Component, View, By, DebugElement, DOM} from 'angular2/angular2';
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
import {RouteParams} from 'angular2/router';
import {ObservableWrapper} from "angular2/src/facade/async";
import {ROUTER_PRIMARY_COMPONENT} from 'angular2/router';

import {MicropostList, Pager, App} from 'app/components';
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext, signin} from 'app/testing';
import {MicropostService} from "app/services";

const dummyResponse = new Response(new ResponseOptions({
  body: JSON.stringify({
    content: [
      {
        id: 1,
        content: 'content1',
        createdAt: 0,
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
        user: {
          id: 2,
          email: 'test2@test.com',
          name: 'test user2'
        },
      },
    ],
    totalPages: 1,
    totalElements: 2,
  }),
}));

export function main() {
  describe('MicropostList', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;
    var pagerDebugElement:DebugElement;
    var micropostService:MicropostService;

    beforeEachProviders(() => [
      APP_TEST_PROVIDERS,
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
    ]);
    beforeEach(createTestContext(_ => ctx = _));
    beforeEach(inject([MicropostService], _ => micropostService = _));
    beforeEach(() => jasmine.clock().mockDate(new Date(24 * 60 * 60 * 1000)));
    beforeEach(signin({id: 1, email: "test@test.com"}));

    function createCmp(done) {
      ctx.backend.connections.subscribe(conn => {
        conn.mockRespond(dummyResponse);
      });
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(() => {
          cmpDebugElement = ctx.fixture.debugElement.query(By.directive(MicropostList));
          pagerDebugElement = cmpDebugElement.query(By.directive(Pager));
          ctx.fixture.detectChanges();
        });
    }

    beforeEach(createCmp);

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
      expect(pagerDebugElement).toBeTruthy();
    });

    it('can show list of posts', () => {
      const cmp:MicropostList = cmpDebugElement.componentInstance;

      expect(cmp.posts.length).toEqual(2);
      expect(cmp.totalPages).toEqual(1);
      expect(cmp.totalItems).toEqual(2);

      const el = cmpDebugElement.nativeElement;
      expect(DOM.querySelectorAll(el, 'li>.content').length).toEqual(2);

      const content = DOM.querySelector(el, '.content');
      expect(content).toHaveText('content1');

      const timestamp = DOM.querySelector(el, '.timestamp');
      expect(timestamp.innerText).toMatch(/1 day ago/);

      const deleteLinks = DOM.querySelectorAll(el, '.delete');
      expect(deleteLinks[0]).toBeTruthy();
      expect(deleteLinks[1]).toBeFalsy();

      const pager:Pager = pagerDebugElement.componentInstance;
      expect(pager.totalPages).toEqual(1);
    });

    it('list another page when page was changed', () => {
      const cmp:MicropostList = cmpDebugElement.componentInstance;
      spyOn(cmp, 'list');
      pagerDebugElement.triggerEventHandler('pageChanged', <any>{page: 2});
      expect(cmp.list).toHaveBeenCalledWith(2);
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
      spyOn(cmp, 'list');
      deleteLink.click();
      expect(cmp.list).toHaveBeenCalled();
    });

  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<micropost-list userId="1"></micropost-list>`,
  directives: [MicropostList],
})
class TestCmp {
}
