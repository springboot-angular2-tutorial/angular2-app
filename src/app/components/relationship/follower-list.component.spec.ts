import {Component, provide, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {
  beforeEachProviders,
  beforeEach,
  inject,
  async
} from "@angular/core/testing";
import {RouteParams} from "@angular/router-deprecated";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {FollowerListComponent} from "./follower-list.component";
import {RelatedUserListComponent} from "./related-user-list.component";
import {UserStatsComponent} from "../../../shared/components";
import {APP_TEST_PROVIDERS} from "../../index";
import {prepareAppInjector} from "../../../shared/testing";

describe('FollowerListComponent', () => {

  let cmpDebugElement:DebugElement;
  let userStatsDebugElement:DebugElement;
  let userListDebugElement:DebugElement;

  let routeParams:RouteParams;

  beforeEachProviders(() => {
    routeParams = jasmine.createSpyObj('routeParams', ['get']);
    (<jasmine.Spy>routeParams.get).and.returnValue('1');
    return [
      APP_TEST_PROVIDERS,
      provide(RouteParams, {useValue: routeParams}),
    ];
  });
  beforeEach(prepareAppInjector());
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestCmp)
      .then((fixture:ComponentFixture<any>) => {
        cmpDebugElement = fixture.debugElement.query(By.directive(FollowerListComponent));
        userStatsDebugElement = cmpDebugElement.query(By.directive(UserStatsComponent));
        userListDebugElement = cmpDebugElement.query(By.directive(RelatedUserListComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    expect(routeParams.get).toHaveBeenCalledWith('id');
    expect(cmpDebugElement.componentInstance.userId).toEqual('1');
    expect(cmpDebugElement.componentInstance.listProvider).toBeTruthy();
    expect(userStatsDebugElement).toBeTruthy();
    expect(userStatsDebugElement.componentInstance.userId).toEqual('1');
    expect(userListDebugElement).toBeTruthy();
    expect(userListDebugElement.componentInstance.listProvider).toBeTruthy();
  });

});

@Component({
  selector: 'test-cmp',
  template: `<mpt-follower-list></mpt-follower-list>`,
  directives: [FollowerListComponent],
})
class TestCmp {
}
