import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, TestBed, fakeAsync} from "@angular/core/testing";
import {Router} from "@angular/router";
import {UserShowComponent} from "./user-show.component";
import {
  MicropostListComponent,
  FollowBtnComponent,
  UserStatsComponent
} from "../../../shared/components";
import {APP_SERVICE_PROVIDERS} from "../../../shared/services";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {HttpModule} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {TimeAgoPipe} from "../../../shared/pipes/time-ago.pipe";
import {PluralizePipe} from "../../../shared/pipes/pluralize.pipe";
import {GravatarComponent} from "../../../shared/components/gravatar/gravatar.component";

describe('UserShowComponent', () => {

  @Component({
    template: `<router-outlet></router-outlet>`,
  })
  class TestComponent {
  }

  let cmpDebugElement: DebugElement;
  let userStatsDebugElement: DebugElement;
  let followBtnDebugElement: DebugElement;
  let micropostListDebugElement: DebugElement;

  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([
          {path: 'users/:id', component: UserShowComponent},
        ]),
      ],
      providers: [
        APP_SERVICE_PROVIDERS,
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        UserShowComponent,
        MicropostListComponent,
        FollowBtnComponent,
        UserStatsComponent,
        GravatarComponent,
        TimeAgoPipe,
        PluralizePipe,
      ]
    });
  });
  beforeEach(inject([Router], (..._) => [router] = _));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      return router.navigate(['/users', '1']).then(() => {
        cmpDebugElement = fixture.debugElement.query(By.directive(UserShowComponent));
        userStatsDebugElement = cmpDebugElement.query(By.directive(UserStatsComponent));
        followBtnDebugElement = cmpDebugElement.query(By.directive(FollowBtnComponent));
        micropostListDebugElement = cmpDebugElement.query(By.directive(MicropostListComponent));
        fixture.detectChanges();
      });
    });
  }));

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
    const userStats: UserStatsComponent = userStatsDebugElement.componentInstance;
    spyOn(userStats, 'ngOnInit');
    followBtnDebugElement.triggerEventHandler('updated', null);
    expect(userStats.ngOnInit).toHaveBeenCalled();
  });

});
