import {Component, provide, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {ObservableWrapper} from "@angular/common/src/facade/async";
import {ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated";
import {ResponseOptions, Response} from "@angular/http";
import {Feed, Gravatar, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {MicropostService} from "app/services";
import {TestContext, createTestContext} from "app/testing";

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
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Feed));
      });
  }

  beforeEach(createCmp);

  it('can show feed', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp:Feed = cmpDebugElement.componentInstance;
    expect(cmp.feed.length).toEqual(2);

    const el = cmpDebugElement.nativeElement;
    expect(getDOM().querySelectorAll(el, 'li .content').length).toEqual(2);

    const avatarLink = getDOM().querySelector(el, 'li>a');
    expect(avatarLink.getAttribute('href')).toEqual('/users/1');

    const gravatarDebugElement = cmpDebugElement.query(By.directive(Gravatar));
    expect(gravatarDebugElement).toBeTruthy();
    expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');
    expect(gravatarDebugElement.componentInstance.alt).toEqual('test user1');

    const userLink = getDOM().querySelector(el, '.user>a');
    expect(userLink.innerHTML).toEqual("test user1");
    expect(userLink.getAttribute('href')).toEqual('/users/1');

    const content = getDOM().querySelector(el, '.content');
    expect(content.innerHTML).toEqual('content1');

    const timestamp = getDOM().querySelector(el, '.timestamp');
    expect(timestamp.innerText).toMatch(/1 day ago/);

    const deleteLinks = getDOM().querySelectorAll(el, '.delete');
    expect(deleteLinks[0]).toBeTruthy();
    expect(deleteLinks[1]).toBeFalsy();
  });


  it('does not delete micropost when not confirmed', () => {
    const deleteLink = getDOM().querySelector(cmpDebugElement.nativeElement, '.delete');
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(micropostService, 'delete');
    deleteLink.click();
    expect(micropostService.delete).not.toHaveBeenCalled();
  });

  it('deletes micropost when confirmed', done => {
    const cmp:Feed = cmpDebugElement.componentInstance;
    const testCmp:TestCmp = ctx.fixture.debugElement.componentInstance;
    const deleteLink = getDOM().querySelector(cmpDebugElement.nativeElement, '.delete');
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

@Component({
  selector: 'test-cmp',
  template: `<feed (deleted)="listenDeleted()"></feed>`,
  directives: [Feed],
})
class TestCmp {
  listenDeleted() {
  }
}
