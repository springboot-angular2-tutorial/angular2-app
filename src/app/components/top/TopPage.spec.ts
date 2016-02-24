import {Component, View, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {
  beforeEachProviders,
  beforeEach,
  expect,
  describe,
  it
} from "angular2/testing";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {TopPage, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";

describe('TopPage', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));
  beforeEach(done => {
    ctx.init(TestCmp).finally(done).subscribe(() => {
      cmpDebugElement = ctx.fixture.debugElement.query(By.directive(TopPage));
    });
  });

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();

    const signupLink = cmpDebugElement.query(By.css('a')).nativeElement;
    expect(signupLink.getAttribute('href')).toEqual('/signup');
  });

});

@Component({selector: 'test-cmp'})
@View({
  template: `<top-page></top-page>`,
  directives: [TopPage],
})
class TestCmp {
}
