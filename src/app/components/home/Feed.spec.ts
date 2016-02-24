import {Component, View, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  expect,
  describe,
  it
} from "angular2/testing";
import {ObservableWrapper} from "angular2/src/facade/async";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {ResponseOptions, Response} from "angular2/http";
import {Feed, Gravatar, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {MicropostService} from "app/services";
import {TestContext, createTestContext, signin} from "app/testing";

const dummyResponse = new Response(new ResponseOptions({
  body: JSON.stringify([
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
  ]),
}));

describe('Feed', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;
  var micropostService:MicropostService;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));
  beforeEach(inject([MicropostService], _ => {
    micropostService = _
  }));
  beforeEach(signin({id: 1, email: 'test1@test.com'}));
  beforeEach(() => jasmine.clock().mockDate(new Date(24 * 60 * 60 * 1000)));

  function createCmp(done) {
    ctx.backend.connections.subscribe(conn => {
      conn.mockRespond(dummyResponse);
    });
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Feed));
      });
  }

  beforeEach(createCmp);

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can show feed', () => {
    const cmp:Feed = cmpDebugElement.componentInstance;
    expect(cmp.feed.length).toEqual(2);

    const el = cmpDebugElement.nativeElement;
    expect(DOM.querySelectorAll(el, 'li .content').length).toEqual(2);

    const avatarLink = DOM.querySelector(el, 'li>a');
    expect(avatarLink.getAttribute('href')).toEqual('/users/1');

    const gravatarDebugElement = cmpDebugElement.query(By.directive(Gravatar));
    expect(gravatarDebugElement).toBeTruthy();
    expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');
    expect(gravatarDebugElement.componentInstance.alt).toEqual('test user1');

    const userLink = DOM.querySelector(el, '.user>a');
    expect(userLink).toHaveText('test user1');
    expect(userLink.getAttribute('href')).toEqual('/users/1');

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

  it('deletes micropost when confirmed', done => {
    const cmp:Feed = cmpDebugElement.componentInstance;
    const testCmp:TestCmp = ctx.fixture.debugElement.componentInstance;
    const deleteLink = DOM.querySelector(cmpDebugElement.nativeElement, '.delete');
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(cmp, 'list');
    spyOn(testCmp, 'listenDeleted');
    ObservableWrapper.subscribe(cmp.deleted, () => {
      expect(cmp.list).toHaveBeenCalled();
      expect(testCmp.listenDeleted).toHaveBeenCalled();
      done();
    });
    deleteLink.click();
  });

});

@Component({selector: 'test-cmp'})
@View({
  template: `<feed (deleted)="listenDeleted()"></feed>`,
  directives: [Feed],
})
class TestCmp {
  listenDeleted() {
  }
}
