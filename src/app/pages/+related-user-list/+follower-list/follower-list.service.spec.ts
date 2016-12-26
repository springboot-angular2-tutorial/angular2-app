import {inject, TestBed} from "@angular/core/testing";
import {
  ResponseOptions,
  Response,
  RequestMethod,
  HttpModule
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {FollowerListService} from "./follower-list.service";
import {APP_TEST_HTTP_PROVIDERS} from "../../../../testing";

const dummyListJson = [
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
      id: 1,
      email: 'test1@test.com',
      name: 'test user1'
    },
  },
];

describe('FollowerListService', () => {

  let followerListService: FollowerListService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
        FollowerListService,
      ],
    });
  });
  beforeEach(inject([FollowerListService, MockBackend], (..._) => {
    [followerListService, backend] = _;
  }));

  describe('.listFollowers', () => {
    it('list followers', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(dummyListJson),
        })));
        expect(conn.request.method).toEqual(RequestMethod.Get);
        expect(conn.request.url).toEqual('/api/users/1/followers?maxId=2&count=3');
      });
      followerListService.list('1', {maxId: 2, count: 3}).subscribe(res => {
        expect(res).toEqual(dummyListJson);
        done();
      });
    });
  }); // .listFollowers

  describe('.title', () => {
    it('shows title', () => {
      expect(followerListService.title()).toEqual('Followers');
    });
  }); // .title

});
