import {Observable} from "rxjs/Observable";
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {inject, async, addProviders} from "@angular/core/testing";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {RelatedUserListComponent} from "./related-user-list.component";
import {RelatedUser} from "../../../shared/domains";
import {GravatarComponent} from "../../../shared/components";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {APP_SERVICE_PROVIDERS} from "../../../shared/services/index";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";

describe('RelatedUserListComponent', () => {

  @Component({
    template: `<mpt-related-user-list [listProvider]="listProvider"></mpt-related-user-list>`,
    directives: [RelatedUserListComponent],
  })
  class TestComponent {
    listProvider:(params:any) => Observable<RelatedUser[]>;

    constructor() {
      this.listProvider = () => {
        return Observable.of([
          {id: 1, email: 'test1@test.com', name: 'test1', relationshipId: 1},
          {id: 2, email: 'test2@test.com', name: 'test2', relationshipId: 100},
        ]);
      };
    }
  }

  let cmpDebugElement:DebugElement;

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent),
    ...APP_TEST_HTTP_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
  ]));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        cmpDebugElement = fixture.debugElement.query(By.directive(RelatedUserListComponent));
        fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();

    const cmp:RelatedUserListComponent = cmpDebugElement.componentInstance;
    expect(cmp.users.length).toEqual(2);

    expect(getDOM().querySelectorAll(cmpDebugElement.nativeElement, '.users>li').length).toEqual(2);

    const gravatarDebugElement = cmpDebugElement.query(By.directive(GravatarComponent));
    expect(gravatarDebugElement).toBeTruthy();
    expect(gravatarDebugElement.componentInstance.alt).toEqual('test1');
    expect(gravatarDebugElement.componentInstance.email).toEqual('test1@test.com');

    const userLink:HTMLElement = cmpDebugElement.query(By.css('.users>li>a')).nativeElement;
    expect(userLink.innerText).toEqual('test1');
    expect(userLink.getAttribute('href')).toEqual('/users/1');
  });

  it('can load more', () => {
    const cmp:RelatedUserListComponent = cmpDebugElement.componentInstance;
    const moreBtn = getDOM().querySelector(cmpDebugElement.nativeElement, '.moreBtn');
    spyOn(cmp, 'listProvider').and.callThrough();
    moreBtn.click();
    expect(cmp.users.length).toEqual(4);
    expect(cmp.listProvider).toHaveBeenCalledWith({maxId: 100, count: 5});
  });

});
