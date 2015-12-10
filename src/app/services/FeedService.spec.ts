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
  ResponseOptions,
  Response,
  BaseResponseOptions,
  RequestMethod,
} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';

import {APP_TEST_PROVIDERS} from "app/bindings";
import {FeedService} from "app/services";

const dummyJson = [
  {
    id: 1,
    content: 'content1',
    createdAt: 0,
    user: {
      id: 1,
      email: 'test1@test.com',
      name: 'test user1'
    },
  },
  {
    id: 2,
    content: 'content2',
    createdAt: 1234567,
    user: {
      id: 2,
      email: 'test2@test.com',
      name: 'test user2'
    },
  },
];

export function main() {
  describe('FeedService', () => {

    var feedService:FeedService;
    var backend:MockBackend;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(inject([FeedService, MockBackend], (..._) => {
      [feedService, backend] = _;
    }));

    describe('.showFeed', () => {
      it('can show feed', (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(dummyJson),
          })));
          expect(conn.request.method).toEqual(RequestMethod.Get);
          expect(conn.request.url).toEqual('/api/feed');
        });
        feedService.showFeed().subscribe(res => {
          expect(res).toEqual(dummyJson);
          done();
        });
      });
    }); // .showFeed

  });
}
