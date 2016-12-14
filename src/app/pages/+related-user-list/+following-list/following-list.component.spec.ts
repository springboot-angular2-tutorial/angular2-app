import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, TestBed, fakeAsync} from "@angular/core/testing";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {FollowingListComponent} from "./following-list.component";
import {CoreModule} from "../../../core/core.module";
import {FollowingListModule} from "./following-list.module";
import {APP_TEST_HTTP_PROVIDERS} from "../../../../testing/index";

describe('FollowingListComponent', () => {

  @Component({
    template: `<router-outlet></router-outlet>`,
  })
  class TestComponent {
  }

  let router: Router;
  let cmpDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'users/:id/followings',
            component: FollowingListComponent,
          },
        ]),
        CoreModule,
        FollowingListModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
      ]
    });
  });
  beforeEach(inject([Router], (..._) => {
    [router] = _;
  }));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      return router.navigate(['/users', '1', 'followings']).then(() => {
        cmpDebugElement = fixture.debugElement.query(By.directive(FollowingListComponent));
        fixture.detectChanges();
      });
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

});
