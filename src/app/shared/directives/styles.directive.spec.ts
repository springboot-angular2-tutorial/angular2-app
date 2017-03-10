import {Component, DebugElement} from "@angular/core";
import {TestBed, fakeAsync, ComponentFixture} from "@angular/core/testing";
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
    expect(cmpDebugElement.classes).toEqual({'cool_106q26s': true});
  });

  it('can update a class name', () => {
    const testComponent: TestComponent = testDebugElement.componentInstance;
    testComponent.styles = [styles.cool, styles.large];
    fixture.detectChanges();
    expect(cmpDebugElement.classes).toEqual({
      'cool_106q26s': false,
      'cool_106q26s-o_O-large_2mywpu': true,
    });
  });

});
