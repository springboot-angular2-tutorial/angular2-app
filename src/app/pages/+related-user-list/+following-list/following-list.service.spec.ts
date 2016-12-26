import {inject, TestBed} from "@angular/core/testing";
import {
  ResponseOptions,
  Response,
  RequestMethod,
  HttpModule
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {FollowingListService} from "./following-list.service";
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

describe('FollowingListService', () => {

  let followingListService: FollowingListService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
        FollowingListService,
      ],
    });
  });
  beforeEach(inject([FollowingListService, MockBackend], (..._) => {
    [followingListService, backend] = _;
  }));

  describe('.listFollowings', () => {
    it('list followings', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(dummyListJson),
        })));
        expect(conn.request.method).toEqual(RequestMethod.Get);
        expect(conn.request.url).toEqual('/api/users/1/followings?maxId=2&count=3');
      });
      followingListService.list('1', {maxId: 2, count: 3}).subscribe(res => {
        expect(res).toEqual(dummyListJson);
        done();
      });
    });
  }); // .listFollowings

  describe('.title', () => {
    it('shows title', () => {
      expect(followingListService.title()).toEqual('Followings');
    });
  }); // .title

});
