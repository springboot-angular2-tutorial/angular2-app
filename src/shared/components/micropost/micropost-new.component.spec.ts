import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, async, addProviders} from "@angular/core/testing";
import {Response, BaseResponseOptions} from "@angular/http";
import {
  ComponentFixture,
  TestComponentBuilder
} from "@angular/compiler/testing";
import {MockBackend} from "@angular/http/testing";
import {MicropostNewComponent} from "./micropost-new.component";
import {MicropostService} from "../../services";
import {provideFakeRouter} from "../../routes/router-testing-providers";
import {APP_TEST_PROVIDERS} from "../../../app/index";

describe('MicropostNewComponent', () => {

  @Component({
    template: `<mpt-micropost-new (created)="doSomething()"></mpt-micropost-new>`,
    directives: [MicropostNewComponent],
  })
  class TestComponent {
    doSomething() {
    }
  }

  let cmpDebugElement:DebugElement;
  let testCmpDebugElement:DebugElement;

  let micropostService:MicropostService;
  let backend:MockBackend;
  let fixture:ComponentFixture<any>;

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent),
    ...APP_TEST_PROVIDERS,
  ]));
  beforeEach(inject([MicropostService, MockBackend], (..._) => {
    [micropostService, backend] = _;
  }));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((_fixture:ComponentFixture<any>) => {
        fixture = _fixture;
        testCmpDebugElement = fixture.debugElement;
        cmpDebugElement = fixture.debugElement.query(By.directive(MicropostNewComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can create a post', () => {
    const cmp:MicropostNewComponent = cmpDebugElement.componentInstance;
    const inputEl = <HTMLInputElement>cmpDebugElement.query(By.css('textarea')).nativeElement;
    const testCmp:TestComponent = testCmpDebugElement.componentInstance;
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
