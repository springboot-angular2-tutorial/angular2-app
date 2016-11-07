import {Component, DebugElement} from "@angular/core";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {
  TestBed,
  fakeAsync,
  inject,
  ComponentFixture
} from "@angular/core/testing";
import {CoreModule} from "../core.module";
import {ToastModule} from "./toast.module";
import {By} from "@angular/platform-browser";
import {ToastComponent} from "./toast.component";
import {ToastService} from "./toast.service";
import {advance} from "../../../testing/helpers";

describe('ToastComponent', () => {

  @Component({
    template: `<mpt-toast></mpt-toast>`,
  })
  class TestComponent {
  }

  let cmpDebugElement: DebugElement;
  let toastService: ToastService;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ToastModule,
      ],
      declarations: [
        TestComponent,
      ]
    });
  });
  beforeEach(inject([ToastService], (..._) => {
    [toastService] = _;
  }));

  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(ToastComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  xit('can show toast message', fakeAsync(() => {
    toastService.success('Awesome message');
    advance(fixture);
    const el = cmpDebugElement.nativeElement;
    const listItem = getDOM().querySelector(el, 'li');
    expect(listItem.innerText).toMatch(/Awesome message/);
    // FIXME bug? https://github.com/angular/angular/issues/7533
    advance(fixture, 50000);
    expect(listItem.innerText).not.toMatch(/Awesome message/);
  }));

});
