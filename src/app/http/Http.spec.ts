import {provide} from "angular2/core";
import {
  HTTP_PROVIDERS,
  BaseResponseOptions,
  Response,
  BaseRequestOptions,
  RequestMethod
} from "angular2/http";
import {
  inject,
  beforeEachProviders,
  beforeEach,
  expect as _expect,
  NgMatchers
} from "angular2/testing";
import {MockBackend} from "angular2/http/testing";
import {Http} from "app/http";

interface CustomMatchers extends NgMatchers {
  toBeJsonRequestVia(expectedMethod:any):boolean;
}
const expect:(actual:any) => CustomMatchers = <any>_expect;

describe('Http', () => {
  var http:Http;
  var backend:MockBackend;

  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
      deps: [MockBackend, BaseRequestOptions],
    }),
  ]);
  beforeEach(inject([Http, MockBackend], (..._) => {
    [http, backend] = _;
  }));
  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.returnValue('my jwt');
    jasmine.addMatchers({
      toBeJsonRequestVia: () => {
        return {
          compare: (actual, expectedMethod) => {
            let pass = (actual.headers.get('X-AUTH-TOKEN') === 'my jwt')
              && (actual.headers.get('Accept') === 'application/json')
              && (actual.headers.get('Content-Type') === 'application/json')
              && (actual.method === expectedMethod);
            let msg = `Expected json request via ${RequestMethod[actual.method]}`
              + ` to equal ${RequestMethod[expectedMethod]}`;
            return {pass: pass, message: msg};
          }
        };
      }
    });
  });

  describe('#get', () => {
    it('performs a get request', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request).toBeJsonRequestVia(RequestMethod.Get);
      });
      http.get('http://www.google.com').subscribe(done);
    });
  });

  describe('#post', () => {
    it('performs a post request', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request).toBeJsonRequestVia(RequestMethod.Post);
      });
      http.post('http://www.google.com', '').subscribe(done);
    });
  });

  describe('#put', () => {
    it('performs a put request', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request).toBeJsonRequestVia(RequestMethod.Put);
      });
      http.put('http://www.google.com', '').subscribe(done);
    });
  });

  describe('#delete', () => {
    it('performs a delete request', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request).toBeJsonRequestVia(RequestMethod.Delete);
      });
      http.delete('http://www.google.com').subscribe(done);
    });
  });

  describe('#patch', () => {
    it('performs a patch request', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request).toBeJsonRequestVia(RequestMethod.Patch);
      });
      http.patch('http://www.google.com', '').subscribe(done);
    });
  });

  describe('#head', () => {
    it('performs a head request', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request).toBeJsonRequestVia(RequestMethod.Head);
      });
      http.head('http://www.google.com').subscribe(done);
    });
  });
});

