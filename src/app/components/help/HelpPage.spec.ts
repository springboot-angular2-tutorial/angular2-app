import {Component, provide, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {beforeEachProviders, beforeEach} from "@angular/core/testing";
import {ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated";
import {HelpPage, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";

describe('HelpPage', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));

  beforeEach((done) => {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(HelpPage));
      });
  });

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

});

@Component({
  selector: 'test-cmp',
  template: `<help-page></help-page>`,
  directives: [HelpPage],
})
class TestCmp {
}
