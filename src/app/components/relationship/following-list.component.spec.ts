import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, async, addProviders} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {FollowingListComponent} from "./following-list.component";
import {RelatedUserListComponent} from "./related-user-list.component";
import {UserStatsComponent} from "../../../shared/components";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {APP_SERVICE_PROVIDERS} from "../../../shared/services/index";

describe('FollowingListComponent', () => {

  @Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
  })
  class TestComponent {
  }

  let router:Router;
  let cmpDebugElement:DebugElement;
  let userStatsDebugElement:DebugElement;
  let userListDebugElement:DebugElement;

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent, [
      {
        path: 'users/:id/followings',
        component: FollowingListComponent,
      },
    ]),
    ...APP_TEST_HTTP_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
  ]));
  beforeEach(inject([Router], (..._) => {
    [router] = _;
  }));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        return router.navigate(['/users', '1', 'followings']).then(() => {
          cmpDebugElement = fixture.debugElement.query(By.directive(FollowingListComponent));
          userStatsDebugElement = cmpDebugElement.query(By.directive(UserStatsComponent));
          userListDebugElement = cmpDebugElement.query(By.directive(RelatedUserListComponent));
          fixture.detectChanges();
        });
      });
  })));

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

