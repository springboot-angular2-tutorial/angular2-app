import {Component, DebugElement} from "@angular/core";
import {TestBed, inject, fakeAsync} from "@angular/core/testing";
import {ResponseOptions, Response, HttpModule} from "@angular/http";
import {FeedComponent} from "./feed.component";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {By} from "@angular/platform-browser";
import {getDOM} from "@angular/platform-browser-dynamic/testing/private_import_platform-browser";
import {GravatarComponent} from "../../../shared/components/gravatar/gravatar.component";
import {TimeAgoPipe} from "../../../shared/pipes/time-ago.pipe";
import {APP_SERVICE_PROVIDERS} from "../../../shared/services/index";
import {FeedService} from "./feed.service";
import {MicropostService} from "../../../shared/services/micropost.service";

fdescribe('FeedComponent', () => {

  @Component({
    template: `<mpt-feed (deleted)="listenDeleted()"></mpt-feed>`,
    directives: [FeedComponent],
  })
  class TestComponent {
    listenDeleted() {
    }
  }

  let testCmpDebugElement: DebugElement;
  let cmpDebugElement: DebugElement;
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

  beforeEach(() => {
    // TODO consider creating FeedModule
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        FeedService,
        APP_SERVICE_PROVIDERS,
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        FeedComponent,
        GravatarComponent,
        TimeAgoPipe,
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
