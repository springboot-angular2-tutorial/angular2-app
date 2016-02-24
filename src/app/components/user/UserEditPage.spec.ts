import {Component, View, provide, DebugElement} from "angular2/core";
import {By} from "angular2/platform/common_dom";
import {
  beforeEachProviders,
  beforeEach,
  expect,
  xdescribe,
  it
} from "angular2/testing";
import {RouteParams} from "angular2/router";
import {UserEditPage} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext} from "app/testing";

// TODO It's hard to test. It will be solved by https://github.com/angular/angular/issues/4112.
xdescribe('UserEditPage', () => {

  var ctx:TestContext;

  var cmpDebugElement:DebugElement;

  var routeParams:RouteParams;

  beforeEachProviders(() => {
    routeParams = jasmine.createSpyObj('routeParams', ['get']);

    return [
      APP_TEST_PROVIDERS,
      provide(RouteParams, {useValue: routeParams}),
    ]
  });
  beforeEach(createTestContext(_ => ctx = _));

  beforeEach(done => {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe(() => {
        cmpDebugElement = ctx.fixture.debugElement.query(By.directive(UserEditPage));
      }, console.error);
  });

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

});

@Component({selector: 'test-cmp'})
@View({
  template: `<user-edit-page></user-edit-page>`,
  directives: [UserEditPage],
})
class TestCmp {
}
