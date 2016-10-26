import {inject, TestBed} from "@angular/core/testing";
import {
  BaseResponseOptions,
  Response,
  Http,
  RequestMethod,
  HttpModule
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {JsonHttp} from "./";
import {APP_TEST_HTTP_PROVIDERS} from "../../../testing";

describe('JsonHttp', () => {
  let jsonHttp: JsonHttp;
  let http: Http;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
      ],
    });
  });
  beforeEach(inject([JsonHttp, Http, MockBackend], (..._) => {
    [jsonHttp, http, backend] = _;
  }));
  beforeEach(() => {
    localStorage.setItem('jwt', 'test');
  });

  const expectCustomRequest = (method: RequestMethod) => (conn) => {
    conn.mockRespond(new Response(new BaseResponseOptions()));
    expect(conn.request.method).toEqual(method);
    expect(conn.request.headers.has('authorization')).toBeTruthy();
  };

  describe('#get', () => {
    it('performs a get request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Get));
      jsonHttp.get('http://www.google.com').subscribe(done);
    });
  });

  describe('#post', () => {
    it('performs a post request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Post));
      jsonHttp.post('http://www.google.com', {}).subscribe(done);
    });
  });

  describe('#put', () => {
    it('performs a put request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Put));
      jsonHttp.put('http://www.google.com', {}).subscribe(done);
    });
  });

  describe('#delete', () => {
    it('performs a delete request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Delete));
      jsonHttp.delete('http://www.google.com').subscribe(done);
    });
  });

  describe('#patch', () => {
    it('performs a patch request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Patch));
      jsonHttp.patch('http://www.google.com', {}).subscribe(done);
    });
  });

  describe('#head', () => {
    it('performs a head request', (done) => {
      backend.connections.subscribe(expectCustomRequest(RequestMethod.Head));
      jsonHttp.head('http://www.google.com').subscribe(done);
    });
  });

});
