import {inject, TestBed} from "@angular/core/testing";
import {
  Response,
  BaseResponseOptions,
  RequestMethod,
  HttpModule
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {MicropostService} from "./micropost.service";
import {APP_TEST_HTTP_PROVIDERS} from "../http/index";

describe('MicropostService', () => {

  let micropostService: MicropostService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
        MicropostService,
      ],
    });
  });
  beforeEach(inject([MicropostService, MockBackend], (..._) => {
    [micropostService, backend] = _;
  }));

  describe('.create', () => {
    it('can create a micropost', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request.method).toEqual(RequestMethod.Post);
        expect(conn.request.url).toEqual('/api/microposts');
        expect(conn.request.json()).toEqual({
          content: 'my post',
        });
      });
      micropostService.create('my post').subscribe(() => {
        done();
      });
    });
  }); // .create

  describe('.delete', () => {
    it('can delete a micropost', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request.method).toEqual(RequestMethod.Delete);
        expect(conn.request.url).toEqual('/api/microposts/1');
      });
      micropostService.delete(1).subscribe(() => {
        done();
      });
    });
  }); // .delete

});
