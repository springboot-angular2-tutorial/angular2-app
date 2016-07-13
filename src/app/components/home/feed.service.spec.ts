import {inject, addProviders} from "@angular/core/testing";
import {ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {FeedService} from "./feed.service";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";

describe('FeedService', () => {

  let feedService:FeedService;
  let backend:MockBackend;

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

  beforeEach(() => addProviders([
    ...APP_TEST_HTTP_PROVIDERS,
    FeedService,
  ]));
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
