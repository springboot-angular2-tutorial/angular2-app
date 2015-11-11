const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Component, View, By, provide, DebugElement} from 'angular2/angular2';
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

import {TopPage} from 'app/components';
import {APP_TEST_PROVIDERS} from 'app/bindings';
import {TestContext, createTestContext} from 'app/testing';

export function main() {
  describe('TopPage', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(createTestContext(_  => ctx = _));
    beforeEach(done => {
      ctx.init(TestCmp).finally(done).subscribe(rootTC => {
        cmpDebugElement = rootTC.debugElement.query(By.directive(TopPage));
      });
    });

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();

      const signupLink = cmpDebugElement.query(By.css('a')).nativeElement;
      expect(signupLink.getAttribute('href')).toEqual('/signup');
    });

  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<top-page></top-page>`,
  directives: [TopPage],
})
class TestCmp {
}
