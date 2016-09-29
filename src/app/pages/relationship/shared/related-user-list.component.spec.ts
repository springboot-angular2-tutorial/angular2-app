import {Observable} from "rxjs/Observable";
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {TestBed, fakeAsync} from "@angular/core/testing";
import {RelatedUserListComponent} from "./related-user-list.component";
import {RouterTestingModule} from "@angular/router/testing";
import {RelatedUser} from "../../../core/domains";
import {CoreModule} from "../../../core/core.module";
import {GravatarComponent} from "../../../shared/gravatar/gravatar.component";
import {RelatedUserListModule} from "./related-user-list.module";

describe('RelatedUserListComponent', () => {

  @Component({
    template: `<mpt-related-user-list [listProvider]="listProvider"></mpt-related-user-list>`,
  })
  class TestComponent {
    listProvider: (params: any) => Observable<RelatedUser[]>;

    constructor() {
      this.listProvider = () => {
        return Observable.of([
          {id: 1, email: 'test1@test.com', name: 'test1', relationshipId: 1},
          {id: 2, email: 'test2@test.com', name: 'test2', relationshipId: 100},
        ]);
      };
    }
  }

  let cmpDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        CoreModule,
        RelatedUserListModule,
      ],
      declarations: [
        TestComponent,
      ]
    });
  });
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      cmpDebugElement = fixture.debugElement.query(By.directive(RelatedUserListComponent));
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp: RelatedUserListComponent = cmpDebugElement.componentInstance;
    expect(cmp.users.length).toEqual(2);

    expect(getDOM().querySelectorAll(cmpDebugElement.nativeElement, '.users>li').length).toEqual(2);

    const gravatarDebugElement = cmpDebugElement.query(By.directive(GravatarComponent));
    expect(gravatarDebugElement).toBeTruthy();
    expect(gravatarDebugElement.componentInstance.alt).toEqual('test1');
    expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');

    const userLink: HTMLElement = cmpDebugElement.query(By.css('.users>li>a')).nativeElement;
    expect(userLink.innerText).toEqual('test1');
    expect(userLink.getAttribute('href')).toEqual('/users/1');
  });

  it('can load more', () => {
    const cmp: RelatedUserListComponent = cmpDebugElement.componentInstance;
    const moreBtn = getDOM().querySelector(cmpDebugElement.nativeElement, '.moreBtn');
    spyOn(cmp, 'listProvider').and.callThrough();
    moreBtn.click();
    expect(cmp.users.length).toEqual(4);
    expect(cmp.listProvider).toHaveBeenCalledWith({maxId: 100, count: 5});
  });

});
