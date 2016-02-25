import {Observable} from "rxjs/Observable";
import {Component, View, provide, DebugElement, Injector} from "angular2/core";
import {
  beforeEachProviders,
  beforeEach,
  expect,
  it,
  ddescribe,
  inject
} from "angular2/testing";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {By} from "angular2/platform/common_dom";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {BaseResponseOptions, Response} from "angular2/http";
import {UserEditPage, App} from "app/components";
import {APP_TEST_PROVIDERS} from "app/providers";
import {TestContext, createTestContext, signin} from "app/testing";
import {UserService} from "app/services";
import {User} from "app/interfaces";
import {SecurityRouterOutlet} from "app/routes";
import {appInjector} from "../../app-injector";

describe('UserEditPage', () => {

  var ctx:TestContext;
  var cmpDebugElement:DebugElement;
  var userService:UserService;

  const user:User = {id: 1, email: "test@test.com", name: "test user"};

  beforeEachProviders(() => [
    APP_TEST_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
  ]);
  beforeEach(createTestContext(_ => ctx = _));

  beforeEach(inject([UserService], _ => {
    appInjector(Injector.resolveAndCreate([
      provide(UserService, {useValue: _}),
    ]));
    userService = appInjector().get(UserService);
    spyOn(userService, 'get').and.returnValue(Observable.of(user))
  }));
  beforeEach(signin(user));
  beforeEach(done => {
    ctx.init(TestCmp)
      .finally(done)
      .subscribe();
  });
  beforeEach(done => {
    ctx.router.navigate(['/MeEdit']).then(() => {
      ctx.fixture.detectChanges();
      cmpDebugElement = ctx.fixture.debugElement.query(By.directive(UserEditPage));
      done();
    });
  });

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    const cmp:UserEditPage = cmpDebugElement.componentInstance;
    expect(cmp.user).toEqual(user);

    const el = cmpDebugElement.nativeElement;
    const nameInput = <HTMLInputElement>DOM.querySelector(el, '#nameInput');
    expect(nameInput.value).toEqual('test user');

    const emailInput = <HTMLInputElement>DOM.querySelector(el, '#emailInput');
    expect(emailInput.value).toEqual('test@test.com');

    const passwordInput = <HTMLInputElement>DOM.querySelector(el, '#passwordInput');
    expect(passwordInput.value).toEqual('');

    const passwordConfirmationInput = <HTMLInputElement>DOM.querySelector(el, '#passwordConfirmationInput');
    expect(passwordConfirmationInput.value).toEqual('');
  });

  it('can validate inputs', () => {
    const cmp:UserEditPage = cmpDebugElement.componentInstance;
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
    const cmp:UserEditPage = cmpDebugElement.componentInstance;
    spyOn(userService, 'updateMe').and.callThrough();
    ctx.backend.connections.subscribe(conn => {
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

@Component({selector: 'test-cmp'})
@View({
  template: `<router-outlet></router-outlet>`,
  directives: [SecurityRouterOutlet],
})
class TestCmp {
}
