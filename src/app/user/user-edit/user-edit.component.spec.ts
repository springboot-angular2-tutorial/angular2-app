import {Observable} from "rxjs/Observable";
import {Component, DebugElement} from "@angular/core";
import {inject, TestBed, fakeAsync} from "@angular/core/testing";
import {Router} from "@angular/router";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {BaseResponseOptions, Response} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {UserEditComponent} from "./user-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {UserService} from "../../core/services/user.service";
import {User} from "../../../shared/domains";
import {ProfileDataResolver} from "../../../shared/routes/profile-data.resolver";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {APP_RESOLVER_PROVIDERS} from "../../../shared/routes/index";
import {CoreModule} from "../../core/core.module";

describe('UserEditComponent', () => {

  @Component({
    template: `<router-outlet></router-outlet>`,
  })
  class TestComponent {
  }

  let cmpDebugElement: DebugElement;

  let userService: UserService;
  let router: Router;
  let backend: MockBackend;

  const user: User = {id: 1, email: "test@test.com", name: "test user"};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'users/me/edit',
            component: UserEditComponent,
            resolve: {profile: ProfileDataResolver},
          },
        ]),
        CoreModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
        APP_RESOLVER_PROVIDERS,
      ],
      declarations: [
        TestComponent,
        UserEditComponent,
      ]
    });
  });
  beforeEach(inject([UserService, Router, MockBackend, ProfileDataResolver], (..._) => {
    let pdr: ProfileDataResolver;
    [userService, router, backend, pdr] = _;
    spyOn(pdr, 'resolve').and.returnValue(Observable.of(user));
  }));
  beforeEach(fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      return router.navigate(['/users', 'me', 'edit']).then(() => {
        fixture.detectChanges();
        cmpDebugElement = fixture.debugElement.query(By.directive(UserEditComponent));
      });
    });
  }));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
    const cmp: UserEditComponent = cmpDebugElement.componentInstance;
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
    const cmp: UserEditComponent = cmpDebugElement.componentInstance;
    expect(cmp.myForm.valid).toBeTruthy();
    cmp.name.setValue('a');
    cmp.email.setValue('b');
    cmp.password.setValue('c');
    cmp.passwordConfirmation.setValue('d');
    expect(cmp.myForm.valid).toBeFalsy();
    cmp.name.setValue('akira');
    cmp.email.setValue('test@test.com');
    cmp.password.setValue('secret123');
    cmp.passwordConfirmation.setValue('secret123');
    expect(cmp.myForm.valid).toBeTruthy();
  });

  it('can edit my profile', () => {
    const cmp: UserEditComponent = cmpDebugElement.componentInstance;
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
