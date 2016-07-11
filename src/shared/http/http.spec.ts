import {inject, addProviders} from "@angular/core/testing";
import {
  BaseResponseOptions,
  Response,
  Http,
  RequestMethod
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {MyHttp} from "./http";
import {APP_TEST_HTTP_PROVIDERS} from "./index";

describe('MyHttp', () => {
  let myHttp:MyHttp;
  let http:Http;
  let backend:MockBackend;

  beforeEach(() => addProviders([
    ...APP_TEST_HTTP_PROVIDERS,
  ]));
  beforeEach(inject([MyHttp, Http, MockBackend], (..._) => {
    [myHttp, http, backend] = _;
  }));

  const expectCustomRequest = (method:RequestMethod) => (conn) => {
    conn.mockRespond(new Response(new BaseResponseOptions()));
    expect(conn.request.method).toEqual(method);
    expect(conn.request.headers.has('x-auth-token')).toBeTruthy();
  };

  describe('#get', () => {
    it('performs a get request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Get));
      myHttp.get('http://www.google.com').subscribe(done);
    });
  });

  describe('#post', () => {
    it('performs a post request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Post));
      myHttp.post('http://www.google.com', {}).subscribe(done);
    });
  });

  describe('#put', () => {
    it('performs a put request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Put));
      myHttp.put('http://www.google.com', {}).subscribe(done);
    });
  });

  describe('#delete', () => {
    it('performs a delete request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Delete));
      myHttp.delete('http://www.google.com').subscribe(done);
    });
  });

  describe('#patch', () => {
    it('performs a patch request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Patch));
      myHttp.patch('http://www.google.com', {}).subscribe(done);
    });
  });

  describe('#head', () => {
    it('performs a head request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Head));
      myHttp.head('http://www.google.com').subscribe(done);
    });
  });

});
