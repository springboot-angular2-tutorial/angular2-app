import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {TestBed, fakeAsync} from "@angular/core/testing";
import {FeedComponent} from "./feed.component";
import {HomeComponent} from "./home.component";
import {
  MicropostNewComponent,
  UserStatsComponent
} from "../../../shared/components";
import {RouterTestingModule} from "@angular/router/testing";
import {TimeAgoPipe} from "../../../shared/pipes/time-ago.pipe";
import {GravatarComponent} from "../../../shared/components/gravatar/gravatar.component";
import {PluralizePipe} from "../../../shared/pipes/pluralize.pipe";
import {APP_SERVICE_PROVIDERS} from "../../../shared/services/index";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {HttpModule} from "@angular/http";

fdescribe('HomeComponent', () => {

  @Component({
    template: `<mpt-home></mpt-home>`,
    directives: [HomeComponent],
  })
  class TestComponent {
  }

  let cmpDebugElement: DebugElement;
  let userStatsDebugElement: DebugElement;
  let micropostNewDebugElement: DebugElement;
  let feedDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        APP_SERVICE_PROVIDERS,
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        HomeComponent,
        FeedComponent,
        MicropostNewComponent,
        UserStatsComponent,
        GravatarComponent,
        TimeAgoPipe,
        PluralizePipe,
      ]
    });
  });

  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(HomeComponent));
      userStatsDebugElement = cmpDebugElement.query(By.directive(UserStatsComponent));
      micropostNewDebugElement = cmpDebugElement.query(By.directive(MicropostNewComponent));
      feedDebugElement = cmpDebugElement.query(By.directive(FeedComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    expect(userStatsDebugElement).toBeTruthy();
    expect(userStatsDebugElement.componentInstance.userId).toEqual('me');
    expect(micropostNewDebugElement).toBeTruthy();
    expect(feedDebugElement).toBeTruthy();
  });

  it('reload user stats when created new micropost', () => {
    const userStats: UserStatsComponent = userStatsDebugElement.componentInstance;
    spyOn(userStats, 'ngOnInit');
    micropostNewDebugElement.triggerEventHandler('created', null);
    expect(userStats.ngOnInit).toHaveBeenCalled();
  });

  it('reload feed when created new micropost', () => {
    const feed: FeedComponent = feedDebugElement.componentInstance;
    spyOn(feed, 'list');
    micropostNewDebugElement.triggerEventHandler('created', null);
    expect(feed.list).toHaveBeenCalled();
  });

  it('reload user stats when deleted a micropost', () => {
    const userStats: UserStatsComponent = userStatsDebugElement.componentInstance;
    spyOn(userStats, 'ngOnInit');
    feedDebugElement.triggerEventHandler('deleted', null);
    expect(userStats.ngOnInit).toHaveBeenCalled();
  });

});
