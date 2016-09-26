import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, TestBed, fakeAsync} from "@angular/core/testing";
import {Router} from "@angular/router";
import {FollowerListComponent} from "./follower-list.component";
import {RelatedUserListComponent} from "./related-user-list.component";
import {UserStatsComponent} from "../../../shared/components";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {APP_SERVICE_PROVIDERS} from "../../../shared/services/index";
import {HttpModule} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {GravatarComponent} from "../../../shared/components/gravatar/gravatar.component";
import {PluralizePipe} from "../../../shared/pipes/pluralize.pipe";

fdescribe('FollowerListComponent', () => {

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
            path: 'users/:id/followers',
            component: FollowerListComponent,
          },
        ]),
      ],
      providers: [
        APP_SERVICE_PROVIDERS,
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        FollowerListComponent,
        UserStatsComponent,
        RelatedUserListComponent,
        GravatarComponent,
        PluralizePipe,
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
