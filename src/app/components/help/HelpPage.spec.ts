const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Component, View, By, DebugElement} from 'angular2/angular2';
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
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {ResponseOptions, Response} from 'angular2/http';

import {HelpPage} from 'app/components';
import {APP_TEST_PROVIDERS} from 'app/bindings';
import {TestContext, createTestContext} from 'app/testing';

export function main() {
  describe('HelpPage', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
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
