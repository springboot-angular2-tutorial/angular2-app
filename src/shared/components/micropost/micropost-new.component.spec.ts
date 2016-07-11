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
import {MicropostService, APP_SERVICE_PROVIDERS} from "../../services";
import {Router} from "@angular/router";
import {MockRouter} from "../../testing/mock-router";
import {APP_TEST_HTTP_PROVIDERS} from "../../http/index";

describe('MicropostNewComponent', () => {

  @Component({
    template: `<mpt-micropost-new></mpt-micropost-new>`,
    directives: [MicropostNewComponent],
  })
  class TestComponent {
  }

  let cmpDebugElement:DebugElement;

  let micropostService:MicropostService;
  let backend:MockBackend;

  beforeEach(() => addProviders([
    {
      provide: Router,
      useClass: MockRouter,
    },
    ...APP_TEST_HTTP_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
  ]));
  beforeEach(inject([MicropostService, MockBackend], (..._) => {
    [micropostService, backend] = _;
  }));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        cmpDebugElement = fixture.debugElement.query(By.directive(MicropostNewComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  // TODO
  xit('can create a post', done => {
    const cmp:MicropostNewComponent = cmpDebugElement.componentInstance;
    const inputEl = <HTMLInputElement>cmpDebugElement.query(By.css('textarea')).nativeElement;
    const formEl = cmpDebugElement.query(By.css('form')).nativeElement;

    backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new BaseResponseOptions()));
    });
    cmp.created.subscribe(() => {
      expect(inputEl.value).toEqual('');
      done();
    });
    inputEl.value = 'my post';
    formEl.dispatchEvent(new Event('submit'));
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
