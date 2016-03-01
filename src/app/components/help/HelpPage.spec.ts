import {Component, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {beforeEachProviders, beforeEach} from "angular2/testing";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
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
