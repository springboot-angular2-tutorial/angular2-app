import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {TestBed, fakeAsync} from "@angular/core/testing";
import {TopComponent} from "./top.component";
import {RouterTestingModule} from "@angular/router/testing";
import {TopModule} from "./top.module";

describe('TopComponent', () => {

  @Component({
    template: `<mpt-top></mpt-top>`,
  })
  class TestComponent {
  }

  let cmpDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        TopModule,
      ],
      declarations: [
        TestComponent,
      ]
    });
  });
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(TopComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    const signupLink = cmpDebugElement.query(By.css('a')).nativeElement;
    expect(signupLink.getAttribute('href')).toEqual('/signup');
  });

});
