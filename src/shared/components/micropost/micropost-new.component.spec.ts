import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  async
} from "@angular/core/testing";
import {Response, BaseResponseOptions} from "@angular/http";
import {ObservableWrapper} from "@angular/common/src/facade/async";
import {
  ComponentFixture,
  TestComponentBuilder
} from "@angular/compiler/testing";
import {MockBackend} from "@angular/http/testing";
import {APP_TEST_PROVIDERS} from "../../../app";
import {MicropostNewComponent} from "./micropost-new.component";
import {MicropostService} from "../../services";

describe('MicropostNewComponent', () => {

  let cmpDebugElement:DebugElement;

  let micropostService:MicropostService;
  let backend:MockBackend;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
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

  it('can create a post', done => {
    const cmp:MicropostNewComponent = cmpDebugElement.componentInstance;
    const inputEl = <HTMLInputElement>cmpDebugElement.query(By.css('textarea')).nativeElement;
    const formEl = cmpDebugElement.query(By.css('form')).nativeElement;

    backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new BaseResponseOptions()));
    });
    ObservableWrapper.subscribe(cmp.created, () => {
      expect(inputEl.value).toEqual('');
      done();
    });
    inputEl.value = 'my post';
    formEl.dispatchEvent(new Event('submit'));
  });

  // TODO make toastr as a service to test easily
  it('does not create a post when content is blank', () => {
    const inputEl = <HTMLInputElement>cmpDebugElement.query(By.css('textarea')).nativeElement;
    const formEl = cmpDebugElement.query(By.css('form')).nativeElement;
    spyOn(micropostService, 'create').and.callThrough();
    inputEl.value = '';
    formEl.dispatchEvent(new Event('submit'));
    expect(micropostService.create).not.toHaveBeenCalled();
  });

});

@Component({
  selector: 'mpt-test',
  template: `<mpt-micropost-new></mpt-micropost-new>`,
  directives: [MicropostNewComponent],
})
class TestComponent {
}
