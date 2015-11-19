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
import {ObservableWrapper} from "angular2/src/facade/async";

import {Pagination} from "ng2-bootstrap/ng2-bootstrap";

import {MicropostList} from 'app/components';
import {APP_TEST_PROVIDERS} from "app/bindings";
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
    var paginationDebugElement:DebugElement;
    var micropostService:MicropostService;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
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
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(MicropostList));
          paginationDebugElement = cmpDebugElement.query(By.directive(Pagination));
          rootTC.detectChanges();
        });
    }
    beforeEach(createCmp);

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();
      expect(paginationDebugElement).toBeTruthy();
    });

    it('can show list of posts', () => {
      const cmp:MicropostList = cmpDebugElement.componentInstance;

      expect(cmp.posts.length).toEqual(2);
      expect(cmp.totalItems).toEqual(2);
      expect(cmp.totalPages).toEqual(1);

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
  template: `<micropost-list user-id="1"></micropost-list>`,
  directives: [MicropostList],
})
class TestCmp {
}
