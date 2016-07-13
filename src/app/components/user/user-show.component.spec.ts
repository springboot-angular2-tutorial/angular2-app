import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, async, addProviders} from "@angular/core/testing";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {UserShowComponent} from "./user-show.component";
import {
  MicropostListComponent,
  FollowBtnComponent,
  UserStatsComponent
} from "../../../shared/components";
import {APP_SERVICE_PROVIDERS} from "../../../shared/services";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";

describe('UserShowComponent', () => {

  @Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
  })
  class TestComponent {
  }

  let cmpDebugElement:DebugElement;
  let userStatsDebugElement:DebugElement;
  let followBtnDebugElement:DebugElement;
  let micropostListDebugElement:DebugElement;

  let router:Router;

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent, [
      {path: 'users/:id', component: UserShowComponent},
    ]),
    ...APP_TEST_HTTP_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
  ]));
  beforeEach(inject([Router], (..._) => [router] = _));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        return router.navigate(['/users', '1']).then(() => {
          cmpDebugElement = fixture.debugElement.query(By.directive(UserShowComponent));
          userStatsDebugElement = cmpDebugElement.query(By.directive(UserStatsComponent));
          followBtnDebugElement = cmpDebugElement.query(By.directive(FollowBtnComponent));
          micropostListDebugElement = cmpDebugElement.query(By.directive(MicropostListComponent));
          fixture.detectChanges();
        });
      })
      .catch(e => console.error(e));
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    expect(userStatsDebugElement).toBeTruthy();
    expect(userStatsDebugElement.componentInstance.userId).toEqual('1');
    expect(micropostListDebugElement).toBeTruthy();
    expect(micropostListDebugElement.componentInstance.userId).toEqual('1');
    expect(followBtnDebugElement).toBeTruthy();
    expect(followBtnDebugElement.componentInstance.followerId).toEqual('1');
  });

  it('reload user stats when following status was updated', () => {
    const userStats:UserStatsComponent = userStatsDebugElement.componentInstance;
    spyOn(userStats, 'ngOnInit');
    followBtnDebugElement.triggerEventHandler('updated', null);
    expect(userStats.ngOnInit).toHaveBeenCalled();
  });

});
