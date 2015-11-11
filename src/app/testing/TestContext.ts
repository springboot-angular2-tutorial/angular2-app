const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {By, DebugElement} from 'angular2/angular2';
import {MockBackend} from 'angular2/http';
import {Router, Location} from 'angular2/router';
import {inject, RootTestComponent, TestComponentBuilder} from 'angular2/testing';

const tokens = [TestComponentBuilder, Router, Location, MockBackend];

export function createTestContext(fn:Function) {
  return inject(tokens, (tcb, router, location, backend) => {
    const ctx = new TestContext({
      tcb: tcb,
      router: router,
      location: location,
      backend: backend,
    });
    fn(ctx);
  });
}

export class TestContext {

  private _tcb:TestComponentBuilder;
  private _router:Router;
  private _location:Location;
  private _backend:MockBackend;
  private _rootTC:RootTestComponent;

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

  init(rootComponent:Function):Rx.Observable<RootTestComponent> {
    const promise = this._tcb.createAsync(rootComponent)
      .then(rootTC => {
        this._rootTC = rootTC;
        rootTC.detectChanges();
        return rootTC;
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

  get rootTC():RootTestComponent {
    return this._rootTC;
  }
}
