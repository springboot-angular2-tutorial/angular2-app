import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, TestBed, fakeAsync} from "@angular/core/testing";
import {Response, BaseResponseOptions, HttpModule} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {MicropostNewComponent} from "./micropost-new.component";
import {MicropostService, APP_SERVICE_PROVIDERS} from "../../services";
import {RouterTestingModule} from "@angular/router/testing";
import {APP_TEST_HTTP_PROVIDERS} from "../../http/index";

fdescribe('MicropostNewComponent', () => {

  @Component({
    template: `<mpt-micropost-new (created)="doSomething()"></mpt-micropost-new>`,
  })
  class TestComponent {
    doSomething() {
    }
  }

  let cmpDebugElement: DebugElement;
  let testCmpDebugElement: DebugElement;

  let micropostService: MicropostService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        APP_SERVICE_PROVIDERS,
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        MicropostNewComponent,
      ]
    });
  });
  beforeEach(inject([MicropostService, MockBackend], (..._) => {
    [micropostService, backend] = _;
  }));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      testCmpDebugElement = fixture.debugElement;
      cmpDebugElement = fixture.debugElement.query(By.directive(MicropostNewComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can create a post', () => {
    const cmp: MicropostNewComponent = cmpDebugElement.componentInstance;
    const inputEl = <HTMLInputElement>cmpDebugElement.query(By.css('textarea')).nativeElement;
    const testCmp: TestComponent = testCmpDebugElement.componentInstance;
    backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new BaseResponseOptions()));
    });
    inputEl.value = 'my post';
    spyOn(testCmp, 'doSomething');
    cmp.create(inputEl);
    expect(inputEl.value).toEqual('');
    expect(testCmp.doSomething).toHaveBeenCalled();
  });

  it('does not create a post when content is blank', () => {
    const inputEl = <HTMLInputElement>cmpDebugElement.query(By.css('textarea')).nativeElement;
    const formEl = cmpDebugElement.query(By.css('button')).nativeElement;
    spyOn(micropostService, 'create').and.callThrough();
    inputEl.value = '';
    return new Promise(resolve => {
      formEl.dispatchEvent(new Event('submit'));
      expect(micropostService.create).not.toHaveBeenCalled();
      resolve();
    });
  });

});
