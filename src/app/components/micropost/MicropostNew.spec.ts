import {Component, provide, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {Response, BaseResponseOptions} from "@angular/http";
import {ObservableWrapper} from "@angular/common/src/facade/async";
import {ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated";
import {MicropostNew, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";
import {MicropostService} from "app/services";

describe('MicropostNew', () => {

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
  beforeEach(done => {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(MicropostNew));
      });
  });

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can create a post', done => {
    const cmp:MicropostNew = cmpDebugElement.componentInstance;
    const inputEl = <HTMLInputElement>cmpDebugElement.query(By.css('textarea')).nativeElement;
    const formEl = cmpDebugElement.query(By.css('form')).nativeElement;

    ctx.backend.connections.subscribe(conn => {
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
  selector: 'test-cmp',
  template: `<micropost-new></micropost-new>`,
  directives: [MicropostNew],
})
class TestCmp {
}
