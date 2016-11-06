import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {TestBed, fakeAsync} from "@angular/core/testing";
import {GravatarComponent} from "./gravatar.component";
import {StylesDirective} from "../directives/styles.directive";

describe('GravatarComponent', () => {

  @Component({
    template: `<mpt-gravatar [hash]="'9a3f499f653f7e8d4c5bf3ae0cf6418f'"
                             [alt]="'test-alt'" [size]="1"></mpt-gravatar>`,
  })
  class TestComponent {
  }

  let cmpDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [
        TestComponent,
        GravatarComponent,
        StylesDirective,
      ]
    });
  });
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(GravatarComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp: GravatarComponent = cmpDebugElement.componentInstance;
    expect(cmp.hash).toEqual('9a3f499f653f7e8d4c5bf3ae0cf6418f');
    expect(cmp.alt).toEqual('test-alt');
    expect(cmp.size).toEqual(1);

    const el = cmpDebugElement.nativeElement;
    expect(getDOM().querySelector(el, 'img').getAttribute('src'))
      .toEqual('https://secure.gravatar.com/avatar/9a3f499f653f7e8d4c5bf3ae0cf6418f?s=1');
  });

});
