import {Observable} from "rxjs/Observable";
import {Component, provide, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  async
} from "@angular/core/testing";
import {RouteParams, Router} from "@angular/router-deprecated";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {APP_TEST_PROVIDERS} from "../../index";
import {UserShowComponent} from "./user-show.component";
import {
  MicropostListComponent,
  FollowBtnComponent,
  UserStatsComponent
} from "../../../shared/components";
import {UserService} from "../../../shared/services";
import {prepareAppInjector} from "../../../shared/testing";

// TODO
xdescribe('UserShowComponent', () => {

  @Component({
    template: `<mpt-user-show></mpt-user-show>`,
    directives: [UserShowComponent],
  })
  class TestComponent {
  }

  let cmpDebugElement:DebugElement;
  let userStatsDebugElement:DebugElement;
  let followBtnDebugElement:DebugElement;
  let micropostListDebugElement:DebugElement;

  let userService:UserService;
  let routeParams:RouteParams;
  let router:Router;

  beforeEachProviders(() => {
    routeParams = jasmine.createSpyObj('routeParams', ['get']);
    (<jasmine.Spy>routeParams.get).and.returnValue('1');
    return [
      APP_TEST_PROVIDERS,
      provide(RouteParams, {useValue: routeParams}),
    ];
  });
  beforeEach(prepareAppInjector());
  beforeEach(inject([UserService, Router], (..._) => {
    [userService, router] = _;
    spyOn(userService, 'get').and.returnValue(Observable.empty());
  }));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        return router.navigate(['/UserShow', {id: 1}]).then(() => {
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
    spyOn(userStats, 'ngOnChanges');
    followBtnDebugElement.triggerEventHandler('updated', null);
    expect(userStats.ngOnChanges).toHaveBeenCalled();
  });

});
