import {Component, View, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {
  beforeEachProviders,
  beforeEach,
  expect,
  describe,
  it
} from "angular2/testing";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {Gravatar, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";

describe('Gravatar', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));
  beforeEach(done => {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Gravatar));
      });
  });

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp:Gravatar = cmpDebugElement.componentInstance;
    expect(cmp.email).toEqual('test@test.com');
    expect(cmp.alt).toEqual('test-alt');
    expect(cmp.size).toEqual('1');

    const el = cmpDebugElement.nativeElement;
    expect(DOM.querySelector(el, 'img').getAttribute('src'))
      .toEqual('https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=1');
  });

});

@Component({selector: 'test-cmp'})
@View({
  template: `<gravatar email="test@test.com" alt="test-alt" size="1"></gravatar>`,
  directives: [Gravatar],
})
class TestCmp {
}
