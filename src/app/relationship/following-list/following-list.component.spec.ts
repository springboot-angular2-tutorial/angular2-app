import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, TestBed, fakeAsync} from "@angular/core/testing";
import {Router} from "@angular/router";
import {FollowingListComponent} from "./following-list.component";
import {RelatedUserListComponent} from "../shared/related-user-list.component";
import {HttpModule} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {APP_SERVICE_PROVIDERS} from "../../../shared/services/index";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {UserStatsComponent} from "../../../shared/components/user-stats/user-stats.component";
import {GravatarComponent} from "../../../shared/components/gravatar/gravatar.component";
import {SharedModule} from "../../shared/shared.module";

describe('FollowingListComponent', () => {

  @Component({
    template: `<router-outlet></router-outlet>`,
  })
  class TestComponent {
  }

  let router: Router;
  let cmpDebugElement: DebugElement;
  let userStatsDebugElement: DebugElement;
  let userListDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([
          {
            path: 'users/:id/followings',
            component: FollowingListComponent,
          },
        ]),
        SharedModule,
      ],
      providers: [
        APP_SERVICE_PROVIDERS,
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        FollowingListComponent,
        UserStatsComponent,
        RelatedUserListComponent,
        GravatarComponent,
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
        userStatsDebugElement = cmpDebugElement.query(By.directive(UserStatsComponent));
        userListDebugElement = cmpDebugElement.query(By.directive(RelatedUserListComponent));
        fixture.detectChanges();
      });
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    expect(cmpDebugElement.componentInstance.userId).toEqual('1');
    expect(cmpDebugElement.componentInstance.listProvider).toBeTruthy();
    expect(userStatsDebugElement).toBeTruthy();
    expect(userStatsDebugElement.componentInstance.userId).toEqual('1');
    expect(userListDebugElement).toBeTruthy();
    expect(userListDebugElement.componentInstance.listProvider).toBeTruthy();
  });

});

