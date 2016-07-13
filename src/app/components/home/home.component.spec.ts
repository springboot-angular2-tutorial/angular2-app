import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, async, addProviders} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {FeedComponent} from "./feed.component";
import {HomeComponent} from "./home.component";
import {
  MicropostNewComponent,
  UserStatsComponent
} from "../../../shared/components";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";
import {APP_TEST_PROVIDERS} from "../../index";

describe('HomeComponent', () => {

  @Component({
    template: `<mpt-home></mpt-home>`,
    directives: [HomeComponent],
  })
  class TestComponent {
  }

  let cmpDebugElement:DebugElement;
  let userStatsDebugElement:DebugElement;
  let micropostNewDebugElement:DebugElement;
  let feedDebugElement:DebugElement;

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent),
    APP_TEST_PROVIDERS,
  ]));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        cmpDebugElement = fixture.debugElement.query(By.directive(HomeComponent));
        userStatsDebugElement = cmpDebugElement.query(By.directive(UserStatsComponent));
        micropostNewDebugElement = cmpDebugElement.query(By.directive(MicropostNewComponent));
        feedDebugElement = cmpDebugElement.query(By.directive(FeedComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    expect(userStatsDebugElement).toBeTruthy();
    expect(userStatsDebugElement.componentInstance.userId).toEqual('me');
    expect(micropostNewDebugElement).toBeTruthy();
    expect(feedDebugElement).toBeTruthy();
  });

  it('reload user stats when created new micropost', () => {
    const userStats:UserStatsComponent = userStatsDebugElement.componentInstance;
    spyOn(userStats, 'ngOnInit');
    micropostNewDebugElement.triggerEventHandler('created', null);
    expect(userStats.ngOnInit).toHaveBeenCalled();
  });

  it('reload feed when created new micropost', () => {
    const feed:FeedComponent = feedDebugElement.componentInstance;
    spyOn(feed, 'list');
    micropostNewDebugElement.triggerEventHandler('created', null);
    expect(feed.list).toHaveBeenCalled();
  });

  it('reload user stats when deleted a micropost', () => {
    const userStats:UserStatsComponent = userStatsDebugElement.componentInstance;
    spyOn(userStats, 'ngOnInit');
    feedDebugElement.triggerEventHandler('deleted', null);
    expect(userStats.ngOnInit).toHaveBeenCalled();
  });

});
