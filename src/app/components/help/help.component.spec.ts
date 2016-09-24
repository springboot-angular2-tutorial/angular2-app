import {async} from "@angular/core/testing";
import {HelpComponent} from "./help.component";
import {TestBed, inject} from "@angular/core/testing/test_bed";

fdescribe('HelpComponent', () => {

  // @Component({
  //   template: `<mpt-help></mpt-help>`,
  //   directives: [HelpComponent],
  // })
  // class TestComponent {
  // }

  // let cmpDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelpComponent,
      ]
      // declarations: [TestComponent],
    });
  });

  // beforeEach(async(() => {
  //   TestBed.compileComponents().then(() => {
  //     const fixture = TestBed.createComponent(TestComponent);
  //     fixture.detectChanges();
  //     cmpDebugElement = fixture.debugElement.query(By.directive(HelpComponent));
  //   });
  // }));

  // it('can be shown', () => {
  //   expect(cmpDebugElement).toBeTruthy();
  // });

  it('should have default data', inject([HelpComponent], (cmp: HelpComponent) => {
    expect(cmp).toBeTruthy();
    // expect(home.localState).toEqual({value: ''});
  }));


});

