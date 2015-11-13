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
import {RelationshipService} from "app/services";

export function main() {
  describe('RelationshipService', () => {

    var relationshipService:RelationshipService;
    var backend:MockBackend;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(inject([RelationshipService, MockBackend], (..._) => {
      [relationshipService, backend] = _;
    }));

    describe('.isFollowing', () => {
      describe('when following', () => {
        it('return true', (done) => {
          backend.connections.subscribe(conn => {
            conn.mockRespond(new Response(new BaseResponseOptions()));
            expect(conn.request.method).toEqual(RequestMethods.Get);
            expect(conn.request.url).toEqual('/api/relationships/to/1');
          });
          relationshipService.isFollowing('1').subscribe(result => {
            expect(result).toBeTruthy();
            done();
          });
        });
      });
      describe('when not following', () => {
        it('return false', (done) => {
          backend.connections.subscribe(conn => {
            conn.mockRespond(new Response(new ResponseOptions({
              status: 404,
            })));
          });
          relationshipService.isFollowing('1').subscribe(result => {
            expect(result).toBeFalsy();
            done();
          });
        });
      });
    }); // .isFollowing

    describe('.follow', () => {
      it('can follow user', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new BaseResponseOptions()));
          expect(conn.request.method).toEqual(RequestMethods.Post);
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
          expect(conn.request.method).toEqual(RequestMethods.Delete);
          expect(conn.request.url).toEqual('/api/relationships/to/1');
        });
        relationshipService.unfollow('1').subscribe(() => {
          done();
        });
      });
    }); // .unfollow

  });
}
