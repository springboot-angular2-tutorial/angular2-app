import {Component, DebugElement} from "@angular/core";
import {HelpComponent} from "./help.component";
import {TestBed, fakeAsync} from "@angular/core/testing";
import {HelpModule} from "./help.module";
import {By} from "@angular/platform-browser";

describe('HelpComponent', () => {

  @Component({
    template: `<mpt-help></mpt-help>`,
  })
  class TestComponent {
  }

  let cmpDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HelpModule,
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
      cmpDebugElement = fixture.debugElement.query(By.directive(HelpComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

});

