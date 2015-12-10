import {provide, Component, View, By, DebugElement, DOM} from 'angular2/angular2';
import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  iit,
} from 'angular2/testing';
import {ResponseOptions, Response} from 'angular2/http';
import {ROUTER_PRIMARY_COMPONENT} from 'angular2/router';

import {HelpPage, App} from 'app/components';
import {APP_TEST_PROVIDERS} from 'app/bindings';
import {TestContext, createTestContext} from 'app/testing';

export function main() {
  describe('HelpPage', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;

    beforeEachProviders(() => [
      APP_TEST_PROVIDERS,
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
    ]);
    beforeEach(createTestContext(_  => ctx = _));

    beforeEach((done) => {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(HelpPage));
        });
    });

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy()
    });

  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<help-page></help-page>`,
  directives: [HelpPage],
})
class TestCmp {
}
