import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {
  beforeEachProviders,
  beforeEach,
  inject,
  async
} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {TopComponent} from "./top.component";
import {APP_TEST_PROVIDERS} from "../../index";
import {prepareAppInjector} from "../../../shared/testing";

describe('TopComponent', () => {

  let cmpDebugElement:DebugElement;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(prepareAppInjector());
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestCmp)
      .then((fixture:ComponentFixture<any>) => {
        cmpDebugElement = fixture.debugElement.query(By.directive(TopComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();

    const signupLink = cmpDebugElement.query(By.css('a')).nativeElement;
    expect(signupLink.getAttribute('href')).toEqual('/signup');
  });

});

@Component({
  selector: 'test-cmp',
  template: `<mpt-top></mpt-top>`,
  directives: [TopComponent],
})
class TestCmp {
}
