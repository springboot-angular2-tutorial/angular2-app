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
  BaseResponseOptions,
  RequestMethod,
} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';

import {APP_TEST_PROVIDERS} from "app/providers";
import {RelationshipService} from "app/services";

export function main() {
  describe('RelationshipService', () => {

    var relationshipService:RelationshipService;
    var backend:MockBackend;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(inject([RelationshipService, MockBackend], (..._) => {
      [relationshipService, backend] = _;
    }));

    describe('.follow', () => {
      it('can follow user', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new BaseResponseOptions()));
          expect(conn.request.method).toEqual(RequestMethod.Post);
          expect(conn.request.url).toEqual('/api/relationships/to/1');
        });
        relationshipService.follow('1').subscribe(() => {
          done();
        });
      });
    }); // .follow

    describe('.unfollow', () => {
      it('can unfollow user', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new BaseResponseOptions()));
          expect(conn.request.method).toEqual(RequestMethod.Delete);
          expect(conn.request.url).toEqual('/api/relationships/to/1');
        });
        relationshipService.unfollow('1').subscribe(() => {
          done();
        });
      });
    }); // .unfollow

  });
}
