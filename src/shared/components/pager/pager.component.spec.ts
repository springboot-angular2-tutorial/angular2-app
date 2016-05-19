import {Component, DebugElement, EventEmitter} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  async
} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {ObservableWrapper} from "@angular/compiler/src/facade/async";
import {APP_TEST_PROVIDERS} from "../../../app/index";
import {prepareAppInjector} from "../../../shared/testing";
import {PagerComponent} from "./pager.component";

describe('PagerComponent', () => {

  let cmpDebugElement:DebugElement;
  let testCmpDebugElement:DebugElement;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(prepareAppInjector());
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestCmp)
      .then((fixture:ComponentFixture<any>) => {
        testCmpDebugElement = fixture.debugElement;
        cmpDebugElement = fixture.debugElement.query(By.directive(PagerComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  describe('.showPrev', () => {
    it('does not show previous page, when current page is 1', () => {
      const pager:PagerComponent = cmpDebugElement.componentInstance;
      pager.currentPage = 1;
      pager.showPrev();
      expect(pager.currentPage).toBe(1);
    });

    it('shows previous page, when current page is greater than 1', (done) => {
      const pager:PagerComponent = cmpDebugElement.componentInstance;
      const testCmp:TestCmp = testCmpDebugElement.componentInstance;
      pager.currentPage = 2;
      pager.showPrev();
      expect(pager.currentPage).toBe(1);
      ObservableWrapper.subscribe(testCmp.doneSomething, done);
    });
  });

  describe('.showNext', () => {
    it('does not show next page, when current page is the last one', () => {
      const pager:PagerComponent = cmpDebugElement.componentInstance;
      pager.currentPage = 2;
      pager.totalPages = 2;
      pager.showNext();
      expect(pager.currentPage).toBe(2);
    });

    it('shows next page, when it has next page', (done) => {
      const pager:PagerComponent = cmpDebugElement.componentInstance;
      const testCmp:TestCmp = testCmpDebugElement.componentInstance;
      pager.currentPage = 1;
      pager.totalPages = 2;
      pager.showNext();
      expect(pager.currentPage).toBe(2);
      ObservableWrapper.subscribe(testCmp.doneSomething, done);
    });
  });

});

@Component({
  selector: 'test-cmp',
  template: `<mpt-pager (pageChanged)="doSomething()"></mpt-pager>`,
  directives: [PagerComponent],
})
class TestCmp {
  doneSomething:EventEmitter<any> = new EventEmitter();

  doSomething() {
    this.doneSomething.emit({});
  }
}
