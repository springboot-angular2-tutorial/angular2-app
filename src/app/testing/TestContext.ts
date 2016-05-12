import {Observable} from "rxjs/Observable";
import {Location} from "@angular/common";
import {MockBackend} from "@angular/http/testing";
import {Router} from "@angular/router-deprecated";
import {inject} from "@angular/core/testing";
import {
  ComponentFixture,
  TestComponentBuilder
} from "@angular/compiler/testing";
import {UserService} from "../services/UserService";
import {LoginService} from "../services/LoginService";
import {ReflectiveInjector, provide} from "@angular/core";
import {appInjector} from "../app-injector";

const tokens = [
  TestComponentBuilder,
  Router,
  Location,
  MockBackend,
  // use for appInjector.
  UserService,
  LoginService,
];

export function createTestContext(fn:Function) {
  return inject(tokens, (tcb, router, location, backend, userService, loginService) => {
    // TODO it's not a good idea, but I have no other way.
    // It must be resolved in https://github.com/angular/angular/issues/4112
    appInjector(ReflectiveInjector.resolveAndCreate([
      provide(UserService, {useValue: userService}),
      provide(LoginService, {useValue: loginService}),
      provide(Router, {useValue: router}),
    ]));
    const ctx = new TestContext({tcb, router, location, backend});
    fn(ctx);
  });
}

export class TestContext {

  private _tcb:TestComponentBuilder;
  private _router:Router;
  private _location:Location;
  private _backend:MockBackend;
  private _fixture:ComponentFixture<any>;

  constructor({tcb, router, location, backend}:{
    tcb:TestComponentBuilder,
    router:Router,
    location:Location,
    backend:MockBackend,
  }) {
    this._tcb = tcb;
    this._router = router;
    this._location = location;
    this._backend = backend;
  }

  init(rootComponent:Function):Observable<void> {
    const promise = this._tcb.createAsync(rootComponent)
      .then(fixture => {
        this._fixture = fixture;
        fixture.detectChanges();
      });
    return Observable.fromPromise(promise);
  }

  get router():Router {
    return this._router;
  }

  get location():Location {
    return this._location;
  }

  get backend():MockBackend {
    return this._backend;
  }

  get fixture():ComponentFixture<any> {
    return this._fixture;
  }
}
