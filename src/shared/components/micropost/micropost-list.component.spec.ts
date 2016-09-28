import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {inject, TestBed, fakeAsync} from "@angular/core/testing";
import {ResponseOptions, Response, HttpModule} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {MicropostListComponent} from "./micropost-list.component";
import {MicropostService, APP_SERVICE_PROVIDERS} from "../../services";
import {APP_TEST_HTTP_PROVIDERS} from "../../http/index";
import {RouterTestingModule} from "@angular/router/testing";
import {SharedModule} from "../../../app/shared/shared.module";

describe('MicropostListComponent', () => {

  @Component({
    template: `<mpt-micropost-list userId="1"></mpt-micropost-list>`,
  })
  class TestComponent {
  }

  let cmpDebugElement: DebugElement;

  let micropostService: MicropostService;
  let backend: MockBackend;

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
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([]),
        SharedModule,
      ],
      providers: [
        APP_SERVICE_PROVIDERS,
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        MicropostListComponent,
      ]
    });
  });
  beforeEach(inject([MicropostService, MockBackend], (..._) => {
    [micropostService, backend] = _;
    backend.connections.subscribe(conn => conn.mockRespond(dummyResponse));
  }));
  beforeEach(() => jasmine.clock().mockDate(new Date(24 * 60 * 60 * 1000)));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(MicropostListComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can show list of posts', () => {
    const cmp: MicropostListComponent = cmpDebugElement.componentInstance;
    expect(cmp.posts.length).toEqual(2);

    const el = cmpDebugElement.nativeElement;
    expect(getDOM().querySelectorAll(el, 'li>.content').length).toEqual(2);

    const content = getDOM().querySelector(el, '.content');
    expect(content.innerHTML).toEqual('content1');

    const timestamp = getDOM().querySelector(el, '.timestamp');
    expect(timestamp.innerText).toMatch(/1 day ago/);

    const deleteLinks = getDOM().querySelectorAll(el, '.delete');
    expect(deleteLinks[0]).toBeTruthy();
    expect(deleteLinks[1]).toBeFalsy();
  });

  it('can load more', () => {
    const cmp: MicropostListComponent = cmpDebugElement.componentInstance;
    const moreBtn = getDOM().querySelector(cmpDebugElement.nativeElement, '.moreBtn');
    moreBtn.click();
    expect(cmp.posts.length).toEqual(4);
  });

  it('does not delete micropost when not confirmed', () => {
    const deleteLink = getDOM().querySelector(cmpDebugElement.nativeElement, '.delete');
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(micropostService, 'delete');
    deleteLink.click();
    expect(micropostService.delete).not.toHaveBeenCalled();
  });

  it('deletes micropost when confirmed', () => {
    const cmp: MicropostListComponent = cmpDebugElement.componentInstance;
    const deleteLink = getDOM().querySelector(cmpDebugElement.nativeElement, '.delete');
    spyOn(window, 'confirm').and.returnValue(true);
    deleteLink.click();
    expect(cmp.posts.length).toEqual(1);
  });

});
