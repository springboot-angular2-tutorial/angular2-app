import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {inject, async} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {GravatarComponent} from "./gravatar.component";

describe('GravatarComponent', () => {

  @Component({
    template: `<mpt-gravatar email="test@test.com" alt="test-alt" size="1"></mpt-gravatar>`,
    directives: [GravatarComponent],
  })
  class TestComponent {
  }

  let cmpDebugElement:DebugElement;

  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        cmpDebugElement = fixture.debugElement.query(By.directive(GravatarComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp:GravatarComponent = cmpDebugElement.componentInstance;
    expect(cmp.email).toEqual('test@test.com');
    expect(cmp.alt).toEqual('test-alt');
    expect(cmp.size).toEqual('1');

    const el = cmpDebugElement.nativeElement;
    expect(getDOM().querySelector(el, 'img').getAttribute('src'))
      .toEqual('https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=1');
  });

});
