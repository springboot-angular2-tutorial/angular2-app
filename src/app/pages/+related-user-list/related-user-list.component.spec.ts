import {Observable} from "rxjs/Observable";
import {Component, DebugElement} from "@angular/core";
import {Router} from "@angular/router";
import {RelatedUserListComponent} from "./related-user-list.component";
import {
  TestBed, inject, fakeAsync,
  ComponentFixture
} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {CoreModule} from "../../core/core.module";
import {UserStatsModule} from "../../components/user-stats/user-stats.module";
import {SharedModule} from "../../shared/shared.module";
import {APP_TEST_HTTP_PROVIDERS} from "../../../testing/index";
import {By} from "@angular/platform-browser";
import {UserStatsComponent} from "../../components/user-stats/user-stats.component";
import {RelatedUser} from "../../core/domains";

describe('RelatedUserListComponent', () => {

  @Component({
    template: `<router-outlet></router-outlet>`,
  })
  class MainComponent {
  }

  @Component({
    selector: 'test',
    templateUrl: './related-user-list.component.html',
  })
  class TestComponent extends RelatedUserListComponent {
    ngOnInit() {
      super.ngOnInit();
      this.title = "test title";
    }

    protected listProvider(maxId: number|null): Observable<RelatedUser[]> {
      switch (maxId) {
        case null:
          return Observable.of([
            {id: 11, relationshipId: 1, name: 'user1'},
            {id: 12, relationshipId: 2, name: 'user2'},
          ]);
        case 2:
          return Observable.of([
            {id: 13, relationshipId: 3, name: 'user3'},
            {id: 14, relationshipId: 4, name: 'user4'},
          ]);
        default:
          return Observable.of([]);
      }
    }
  }

  let router: Router;
  let cmpDebugElement: DebugElement;
  let userStatsDebugElement: DebugElement;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'test/:id',
            component: TestComponent,
          },
        ]),
        CoreModule,
        SharedModule,
        UserStatsModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
      declarations: [
        MainComponent,
        TestComponent,
      ]
    });
  });
  beforeEach(inject([Router], (..._) => {
    [router] = _;
  }));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(MainComponent);
      return router.navigate(['/test', '1']).then(() => {
        cmpDebugElement = fixture.debugElement.query(By.directive(TestComponent));
        userStatsDebugElement = cmpDebugElement.query(By.directive(UserStatsComponent));
        fixture.detectChanges();
      });
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    expect(userStatsDebugElement).toBeTruthy();
    expect(userStatsDebugElement.componentInstance.userId).toEqual('1');

    const el: Element = cmpDebugElement.nativeElement;

    const title = getDOM().querySelector(el, 'h3');
    expect(title.innerText).toEqual('test title');

    const firstItem = getDOM().querySelector(el, 'li:first-child');
    expect(firstItem.innerText).toEqual('user1');

    const secondItem = getDOM().querySelector(el, 'li:nth-child(2)');
    expect(secondItem.innerText).toEqual('user2');

    const moreBtn = getDOM().querySelector(el, 'button');
    expect(moreBtn.hasAttribute('disabled')).toBeFalsy();
  });

  it('can load more', () => {
    const el: Element = cmpDebugElement.nativeElement;
    const moreBtn = getDOM().querySelector(el, 'button');

    moreBtn.click();
    fixture.detectChanges();

    const list = getDOM().querySelectorAll(el, 'li');
    expect(list.length).toEqual(4);

    const lastItem = getDOM().querySelector(el, 'li:last-child');
    expect(lastItem.innerText).toEqual('user4');
  });

  it('can not load more when no more item', () => {
    const el: Element = cmpDebugElement.nativeElement;
    const moreBtn = getDOM().querySelector(el, 'button');

    moreBtn.click();
    moreBtn.click();
    fixture.detectChanges();

    const list = getDOM().querySelectorAll(el, 'li');
    expect(list.length).toEqual(4);

    expect(moreBtn.hasAttribute('disabled')).toBeTruthy();
  });

});
