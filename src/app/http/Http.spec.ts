import {provide} from 'angular2/core';
import {
  HTTP_PROVIDERS,
  BaseResponseOptions,
  ResponseOptions,
  Response,
  BaseRequestOptions,
  RequestMethod,
} from 'angular2/http';
import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect as _expect,
  describe,
  ddescribe,
  it,
  iit,
  NgMatchers,
} from 'angular2/testing';
import {MockBackend} from 'angular2/http/testing';

import {HttpAuthError, HttpClientError, HttpServerError, Http} from 'app/http';

export function main() {

  interface CustomMatchers extends NgMatchers {
    toBeJsonRequestVia(expectedMethod:any):boolean;
  }
  const expect:(actual:any) => CustomMatchers = <any>_expect;

  describe('http.Http', () => {
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
    beforeEach(inject([Http, MockBackend], (..._) => {[http, backend] = _}));
    beforeEach(() => {
      spyOn(Http, 'checkStatus').and.callThrough();
      spyOn(localStorage, 'getItem').and.returnValue('my jwt');
      jasmine.addMatchers({
        toBeJsonRequestVia: () => {
          return {
            compare: (actual, expectedMethod) => {
              let pass = (actual.headers.get('X-AUTH-TOKEN') == 'my jwt')
                && (actual.headers.get('Accept') == 'application/json')
                && (actual.headers.get('Content-Type') == 'application/json')
                && (actual.method == expectedMethod);
              let message = `Expected json request via ${RequestMethod[actual.method]} to equal ${RequestMethod[expectedMethod]}`;
              return {pass: pass, message: message};
            }
          }
        }
      });
    });

    describe('#get', () => {
      it('performs a get request', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new BaseResponseOptions()));
          expect(conn.request).toBeJsonRequestVia(RequestMethod.Get);
        });
        http.get('http://www.google.com').subscribe(() => {
          expect(Http.checkStatus).toHaveBeenCalled();
          done();
        });
      });
    });

    describe('#post', () => {
      it('performs a post request', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new BaseResponseOptions()));
          expect(conn.request).toBeJsonRequestVia(RequestMethod.Post);
        });
        http.post('http://www.google.com', '').subscribe(() => {
          expect(Http.checkStatus).toHaveBeenCalled();
          done();
        });
      });
    });

    describe('#put', () => {
      it('performs a put request', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new BaseResponseOptions()));
          expect(conn.request).toBeJsonRequestVia(RequestMethod.Put);
        });
        http.put('http://www.google.com', '').subscribe(() => {
          expect(Http.checkStatus).toHaveBeenCalled();
          done();
        });
      });
    });

    describe('#delete', () => {
      it('performs a delete request', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new BaseResponseOptions()));
          expect(conn.request).toBeJsonRequestVia(RequestMethod.Delete);
        });
        http.delete('http://www.google.com').subscribe(() => {
          expect(Http.checkStatus).toHaveBeenCalled();
          done();
        });
      });
    });

    describe('#patch', () => {
      it('performs a patch request', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new BaseResponseOptions()));
          expect(conn.request).toBeJsonRequestVia(RequestMethod.Patch);
        });
        http.patch('http://www.google.com', '').subscribe(() => {
          expect(Http.checkStatus).toHaveBeenCalled();
          done();
        });
      });
    });

    describe('#head', () => {
      it('performs a head request', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new BaseResponseOptions()));
          expect(conn.request).toBeJsonRequestVia(RequestMethod.Head);
        });
        http.head('http://www.google.com').subscribe(() => {
          expect(Http.checkStatus).toHaveBeenCalled();
          done();
        });
      });
    });
  }); // http.Http

  describe('http.Http.checkStatus', () => {
    it('throws an AuthError when status is 401', () => {
      const resp = new Response(new ResponseOptions({status: 401}));
      expect(() => Http.checkStatus(resp)).toThrowError(HttpAuthError, resp.statusText);
    });

    it('throws an HttpClientError when status is 400', () => {
      const resp = new Response(new ResponseOptions({status: 400}));
      expect(() => Http.checkStatus(resp)).toThrowError(HttpClientError, resp.statusText);
    });

    it('throws an HttpServerError when status is 500', () => {
      const resp = new Response(new ResponseOptions({status: 500}));
      expect(() => Http.checkStatus(resp)).toThrowError(HttpServerError, resp.statusText);
    });
  }); // http.Http.checkStatus

}
