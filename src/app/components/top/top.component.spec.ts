import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, async, addProviders} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {TopComponent} from "./top.component";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {APP_SERVICE_PROVIDERS} from "../../../shared/services/index";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";

describe('TopComponent', () => {

  @Component({
    template: `<mpt-top></mpt-top>`,
    directives: [TopComponent],
  })
  class TestComponent {
  }

  let cmpDebugElement:DebugElement;

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent),
    ...APP_TEST_HTTP_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
  ]));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
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
