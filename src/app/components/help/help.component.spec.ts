import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {
  beforeEachProviders,
  beforeEach,
  async,
  inject
} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {HelpComponent} from "./help.component";
import {APP_TEST_PROVIDERS} from "../../index";
import {prepareAppInjector} from "../../../shared/testing";

describe('HelpComponent', () => {

  @Component({
    template: `<mpt-help></mpt-help>`,
    directives: [HelpComponent],
  })
  class TestComponent {
  }

  let cmpDebugElement:DebugElement;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(prepareAppInjector());
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        cmpDebugElement = fixture.debugElement.query(By.directive(HelpComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

});

