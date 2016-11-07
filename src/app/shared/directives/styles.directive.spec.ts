import {Component, DebugElement} from "@angular/core";
import {HelpComponent} from "./help.component";
import {TestBed, fakeAsync, ComponentFixture} from "@angular/core/testing";
import {HelpModule} from "./help.module";
import {By} from "@angular/platform-browser";
import {StylesDirective} from "./styles.directive";
import {StyleSheet} from "aphrodite";

describe('StylesDirective', () => {

  const styles = StyleSheet.create({
    cool: {
      backgroundColor: "blue",
    },
    large: {
      fontSize: "50px",
    }
  });

  @Component({
    template: `<div [mptStyles]="styles"></div>`,
  })
  class TestComponent {
    styles: any = [styles.cool];
  }

  let fixture: ComponentFixture<TestComponent>;
  let testDebugElement: DebugElement;
  let cmpDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        StylesDirective,
      ]
    });
  });
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      testDebugElement = fixture.debugElement;
      cmpDebugElement = fixture.debugElement.query(By.css('div'));
    });
  }));

  it('can give a class name for styles', () => {
    expect(cmpDebugElement.classes).toEqual({'cool_1b2uzpk': true});
  });

  it('can update a class name', () => {
    const testComponent: TestComponent = testDebugElement.componentInstance;
    testComponent.styles = [styles.cool, styles.large];
    fixture.detectChanges();
    expect(cmpDebugElement.classes).toEqual({
      'cool_1b2uzpk': false,
      'cool_1b2uzpk-o_O-large_1hjfi1m': true,
    });
  });

});
