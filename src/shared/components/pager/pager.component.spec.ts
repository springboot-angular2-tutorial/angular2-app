import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, async} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {PagerComponent} from "./pager.component";

describe('PagerComponent', () => {

  @Component({
    template: `<mpt-pager (pageChanged)="doSomething()"></mpt-pager>`,
    directives: [PagerComponent],
  })
  class TestComponent {
    doSomething() {
    }
  }

  let cmpDebugElement:DebugElement;
  let testCmpDebugElement:DebugElement;

  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
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

    it('shows previous page, when current page is greater than 1', () => {
      const pager:PagerComponent = cmpDebugElement.componentInstance;
      const testCmp:TestComponent = testCmpDebugElement.componentInstance;
      spyOn(testCmp, 'doSomething');
      pager.currentPage = 2;
      pager.showPrev();
      expect(pager.currentPage).toBe(1);
      expect(testCmp.doSomething).toHaveBeenCalled();
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

    it('shows next page, when it has next page', () => {
      const pager:PagerComponent = cmpDebugElement.componentInstance;
      const testCmp:TestComponent = testCmpDebugElement.componentInstance;
      spyOn(testCmp, 'doSomething');
      pager.currentPage = 1;
      pager.totalPages = 2;
      pager.showNext();
      expect(pager.currentPage).toBe(2);
      expect(testCmp.doSomething).toHaveBeenCalled();
    });
  });

});
