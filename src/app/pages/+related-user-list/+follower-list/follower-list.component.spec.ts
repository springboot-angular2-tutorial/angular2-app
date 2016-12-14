import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, TestBed, fakeAsync} from "@angular/core/testing";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {FollowerListComponent} from "./follower-list.component";
import {CoreModule} from "../../../core/core.module";
import {FollowerListModule} from "./follower-list.module";
import {APP_TEST_HTTP_PROVIDERS} from "../../../../testing/index";

describe('FollowerListComponent', () => {

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
            path: 'users/:id/followers',
            component: FollowerListComponent,
          },
        ]),
        CoreModule,
        FollowerListModule,
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
      return router.navigate(['/users', '1', 'followers']).then(() => {
        cmpDebugElement = fixture.debugElement.query(By.directive(FollowerListComponent));
        fixture.detectChanges();
      });
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

});
