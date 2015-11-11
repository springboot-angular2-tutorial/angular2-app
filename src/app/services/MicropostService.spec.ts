import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  xit,
  iit,
} from 'angular2/testing';
import {
  Headers,
  ResponseOptions,
  Response,
  MockBackend,
  BaseResponseOptions,
  RequestMethods,
} from 'angular2/http';

import {APP_TEST_PROVIDERS} from "app/bindings";
import {MicropostService} from "app/services";

export function main() {
  describe('MicropostService', () => {

    var micropostService:MicropostService;
    var backend:MockBackend;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(inject([MicropostService, MockBackend], (..._) => {
      [micropostService, backend] = _;
    }));

    describe('.create', () => {
      it('can create a micropost', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new BaseResponseOptions()));
          expect(conn.request.method).toEqual(RequestMethods.Post);
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
          expect(conn.request.method).toEqual(RequestMethods.Delete);
          expect(conn.request.url).toEqual('/api/microposts/1');
        });
        micropostService.delete(1).subscribe(() => {
          done();
        });
      });
    }); // .delete

  });
}
