import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {inject, TestBed, fakeAsync} from "@angular/core/testing";
import {Router} from "@angular/router";
import {UserShowComponent} from "./user-show.component";
import {APP_TEST_HTTP_PROVIDERS} from "../../core/http/index";
import {RouterTestingModule} from "@angular/router/testing";
import {GravatarComponent} from "../../../shared/components/gravatar/gravatar.component";
import {MicropostListComponent} from "../../../shared/components/micropost/micropost-list.component";
import {FollowBtnComponent} from "../../../shared/components/follow-btn/follow-btn.component";
import {UserStatsComponent} from "../../../shared/components/user-stats/user-stats.component";
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";

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
        RouterTestingModule.withRoutes([
          {path: 'users/:id', component: UserShowComponent},
        ]),
        CoreModule,
        SharedModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        UserShowComponent,
        MicropostListComponent,
        FollowBtnComponent,
        UserStatsComponent,
        GravatarComponent,
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
