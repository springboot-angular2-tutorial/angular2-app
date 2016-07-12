import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {inject, async, addProviders} from "@angular/core/testing";
import {ResponseOptions, Response} from "@angular/http";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {MockBackend} from "@angular/http/testing";
import {FeedComponent} from "./feed.component";
import {GravatarComponent} from "../../../shared/components";
import {
  MicropostService,
  APP_SERVICE_PROVIDERS
} from "../../../shared/services";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";

describe('FeedComponent', () => {

  @Component({
    template: `<mpt-feed (deleted)="listenDeleted()"></mpt-feed>`,
    directives: [FeedComponent],
  })
  class TestComponent {
    listenDeleted() {
    }
  }

  let testCmpDebugElement:DebugElement;
  let cmpDebugElement:DebugElement;
  let micropostService:MicropostService;

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

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent),
    ...APP_TEST_HTTP_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
  ]));
  beforeEach(inject([MicropostService], _ => micropostService = _));
  beforeEach(inject([MockBackend], _ => {
    _.connections.subscribe(conn => conn.mockRespond(dummyResponse));
  }));
  beforeEach(() => jasmine.clock().mockDate(new Date(24 * 60 * 60 * 1000)));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        testCmpDebugElement = fixture.debugElement;
        cmpDebugElement = fixture.debugElement.query(By.directive(FeedComponent));
        fixture.detectChanges();
      });
  })));

  it('can show feed', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp:FeedComponent = cmpDebugElement.componentInstance;
    expect(cmp.feed.length).toEqual(2);

    const el = cmpDebugElement.nativeElement;
    expect(getDOM().querySelectorAll(el, 'li .content').length).toEqual(2);

    const avatarLink = getDOM().querySelector(el, 'li>a');
    expect(avatarLink.getAttribute('href')).toEqual('/users/1');

    const gravatarDebugElement = cmpDebugElement.query(By.directive(GravatarComponent));
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
    const cmp:FeedComponent = cmpDebugElement.componentInstance;
    const testCmp:TestComponent = testCmpDebugElement.componentInstance;
    const deleteLink = getDOM().querySelector(cmpDebugElement.nativeElement, '.delete');
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(cmp, 'list');
    spyOn(testCmp, 'listenDeleted');
    cmp.deleted.subscribe(() => {
      expect(cmp.list).toHaveBeenCalled();
      expect(testCmp.listenDeleted).toHaveBeenCalled();
      done();
    });
    deleteLink.click();
  });

});
