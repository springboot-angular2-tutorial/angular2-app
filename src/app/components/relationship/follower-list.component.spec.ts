import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, async, addProviders} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {FollowerListComponent} from "./follower-list.component";
import {RelatedUserListComponent} from "./related-user-list.component";
import {UserStatsComponent} from "../../../shared/components";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {APP_SERVICE_PROVIDERS} from "../../../shared/services/index";

describe('FollowerListComponent', () => {

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
        path: 'users/:id/followers',
        component: FollowerListComponent,
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
        return router.navigate(['/users', '1', 'followers']).then(() => {
          cmpDebugElement = fixture.debugElement.query(By.directive(FollowerListComponent));
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
