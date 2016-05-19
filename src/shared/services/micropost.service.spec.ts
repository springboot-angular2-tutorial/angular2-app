import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {Response, BaseResponseOptions, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {MicropostService} from "./micropost.service";
import {APP_TEST_PROVIDERS} from "../../app";

describe('MicropostService', () => {

  let micropostService:MicropostService;
  let backend:MockBackend;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(inject([MicropostService, MockBackend], (..._) => {
    [micropostService, backend] = _;
  }));

  describe('.create', () => {
    it('can create a micropost', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request.method).toEqual(RequestMethod.Post);
        expect(conn.request.url).toEqual('/api/microposts');
        expect(conn.request.text()).toEqual(JSON.stringify({
          content: 'my post',
        }));
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
