import {Component, DebugElement} from "@angular/core";
import {TestBed, inject, fakeAsync} from "@angular/core/testing";
import {ResponseOptions, Response} from "@angular/http";
import {FeedComponent} from "./feed.component";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {By} from "@angular/platform-browser";
import {getDOM} from "@angular/platform-browser-dynamic/testing/private_import_platform-browser";
import {MicropostService} from "../../../core/services/micropost.service";
import {CoreModule} from "../../../core";
import {GravatarComponent} from "../../../shared/gravatar/gravatar.component";
import {FeedModule} from "./feed.module";
import {APP_TEST_HTTP_PROVIDERS} from "../../../../testing";

describe('FeedComponent', () => {

  @Component({
    template: `<mpt-feed (deleted)="listenDeleted()"></mpt-feed>`,
  })
  class TestComponent {
    listenDeleted() {
    }
  }

  let testCmpDebugElement: DebugElement;
  let cmpDebugElement: DebugElement;
  let micropostService: MicropostService;

  const dummyResponse = new Response(new ResponseOptions({
    body: JSON.stringify([
      {
        id: 1,
        content: 'content1',
        createdAt: 0,
        isMyPost: true,
        user: {
          id: 1,
          name: 'test user1',
          avatarHash: '9a3f499f653f7e8d4c5bf3ae0cf6418f',
        },
      },
      {
        id: 2,
        content: 'content2',
        createdAt: 1234567,
        isMyPost: false,
        user: {
          id: 2,
          name: 'test user2',
          avatarHash: '8a3f499f653f7e8d4c5bf3ae0cf6418f',
        },
      },
    ]),
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        FeedModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
      ]
    });
  });
  beforeEach(inject([MicropostService], _ => micropostService = _));
  beforeEach(inject([MockBackend], _ => {
    _.connections.subscribe(conn => conn.mockRespond(dummyResponse));
  }));
  beforeEach(() => jasmine.clock().mockDate(new Date(24 * 60 * 60 * 1000)));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      testCmpDebugElement = fixture.debugElement;
      cmpDebugElement = fixture.debugElement.query(By.directive(FeedComponent));
    });
  }));

  it('can show feed', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp: FeedComponent = cmpDebugElement.componentInstance;
    expect(cmp.feed.length).toEqual(2);

    const el = cmpDebugElement.nativeElement;
    expect(getDOM().querySelectorAll(el, 'li').length).toEqual(2);

    const avatarLink = getDOM().querySelector(el, 'li>a');
    expect(avatarLink.getAttribute('href')).toEqual('/users/1');

    const gravatarDebugElement = cmpDebugElement.query(By.directive(GravatarComponent));
    expect(gravatarDebugElement).toBeTruthy();
    expect(gravatarDebugElement.componentInstance.hash).toEqual('9a3f499f653f7e8d4c5bf3ae0cf6418f');
    expect(gravatarDebugElement.componentInstance.alt).toEqual('test user1');

    const userLink = getDOM().querySelector(el, 'span>a');
    expect(userLink.getAttribute('href')).toEqual('/users/1');

    const firstItem = getDOM().querySelector(el, 'li');
    expect(firstItem.innerText).toMatch(/test user1/);
    expect(firstItem.innerText).toMatch(/content1/);
    expect(firstItem.innerText).toMatch(/1 day ago/);
    expect(firstItem.innerText).toMatch(/delete/);

    const lastItem = getDOM().querySelector(el, 'li:last-child');
    expect(lastItem.innerText).not.toMatch(/delete/);
  });

  it('does not delete micropost when not confirmed', () => {
    const deleteLink = getDOM()
      .querySelector(cmpDebugElement.nativeElement, 'li:first-child > a:last-child');
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(micropostService, 'delete');
    deleteLink.click();
    expect(micropostService.delete).not.toHaveBeenCalled();
  });

  it('deletes micropost when confirmed', done => {
    const cmp: FeedComponent = cmpDebugElement.componentInstance;
    const testCmp: TestComponent = testCmpDebugElement.componentInstance;
    const deleteLink = getDOM()
      .querySelector(cmpDebugElement.nativeElement, 'li:first-child > a:last-child');
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
