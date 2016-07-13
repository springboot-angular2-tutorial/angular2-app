import {Observable} from "rxjs/Observable";
import {Component, DebugElement} from "@angular/core";
import {inject, async, addProviders} from "@angular/core/testing";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {BaseResponseOptions, Response} from "@angular/http";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {MockBackend} from "@angular/http/testing";
import {UserEditComponent} from "./user-edit.component";
import {User} from "../../../shared/domains";
import {UserService} from "../../../shared/services";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";
import {ProfileDataResolver} from "../../../shared/routes/profile-data.resolver";
import {APP_TEST_PROVIDERS} from "../../index";

describe('UserEditComponent', () => {

  @Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
  })
  class TestComponent {
  }

  let cmpDebugElement:DebugElement;

  let userService:UserService;
  let router:Router;
  let backend:MockBackend;

  const user:User = {id: 1, email: "test@test.com", name: "test user"};

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent, [
      {
        path: 'users/me/edit',
        component: UserEditComponent,
        resolve: {profile: ProfileDataResolver},
      },
    ]),
    ...APP_TEST_PROVIDERS,
    ProfileDataResolver,
  ]));
  beforeEach(inject([UserService, Router, MockBackend, ProfileDataResolver], (..._) => {
    let pdr:ProfileDataResolver;
    [userService, router, backend, pdr] = _;
    spyOn(pdr, 'resolve').and.returnValue(Observable.of(user));
  }));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((fixture:ComponentFixture<any>) => {
        return router.navigate(['/users', 'me', 'edit']).then(() => {
          fixture.detectChanges();
          cmpDebugElement = fixture.debugElement.query(By.directive(UserEditComponent));
        });
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    const cmp:UserEditComponent = cmpDebugElement.componentInstance;
    expect(cmp.user).toEqual(user);

    const el = cmpDebugElement.nativeElement;
    const nameInput = <HTMLInputElement>getDOM().querySelector(el, '#nameInput');
    expect(nameInput.value).toEqual('test user');

    const emailInput = <HTMLInputElement>getDOM().querySelector(el, '#emailInput');
    expect(emailInput.value).toEqual('test@test.com');

    const passwordInput = <HTMLInputElement>getDOM().querySelector(el, '#passwordInput');
    expect(passwordInput.value).toEqual('');

    const passwordConfirmationInput = <HTMLInputElement> getDOM()
      .querySelector(el, '#passwordConfirmationInput');
    expect(passwordConfirmationInput.value).toEqual('');
  });

  it('can validate inputs', () => {
    const cmp:UserEditComponent = cmpDebugElement.componentInstance;
    expect(cmp.myForm.valid).toBeTruthy();
    cmp.name.updateValue('a', {});
    cmp.email.updateValue('b', {});
    cmp.password.updateValue('c', {});
    cmp.passwordConfirmation.updateValue('d', {});
    expect(cmp.myForm.valid).toBeFalsy();
    cmp.name.updateValue('akira', {});
    cmp.email.updateValue('test@test.com', {});
    cmp.password.updateValue('secret123', {});
    cmp.passwordConfirmation.updateValue('secret123', {});
    expect(cmp.myForm.valid).toBeTruthy();
  });

  it('can edit my profile', () => {
    const cmp:UserEditComponent = cmpDebugElement.componentInstance;
    spyOn(userService, 'updateMe').and.callThrough();
    backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new BaseResponseOptions()));
    });
    cmp.onSubmit({
      email: 'test@test.com',
      password: 'secret123',
      passwordConfirmation: 'secret123',
      name: '',
    });
    expect(userService.updateMe).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'secret123',
      passwordConfirmation: 'secret123',
    });
  });

});
