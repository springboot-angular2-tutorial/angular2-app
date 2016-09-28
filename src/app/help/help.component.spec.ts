import {HelpComponent} from "./help.component";
import {TestBed, inject} from "@angular/core/testing";

describe('HelpComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelpComponent,
      ]
    });
  });

  it('can be shown', inject([HelpComponent], (cmp: HelpComponent) => {
    expect(cmp).toBeTruthy();
  }));

});

