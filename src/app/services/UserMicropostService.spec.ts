import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {APP_TEST_PROVIDERS} from "app/providers";
import {UserMicropostService} from "app/services";

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
      id: 1,
      email: 'test1@test.com',
      name: 'test user1'
    },
  },
];

describe('UserMicropostService', () => {

  var userMicropostService:UserMicropostService;
  var backend:MockBackend;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(inject([UserMicropostService, MockBackend], (..._) => {
    [userMicropostService, backend] = _;
  }));

  describe('.list', () => {
    it("can list user's posts", (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(dummyJson),
        })));
        expect(conn.request.method).toEqual(RequestMethod.Get);
        expect(conn.request.url).toEqual('/api/users/1/microposts?maxId=2&count=3');
      });
      userMicropostService.list('1', {maxId: 2, count: 3}).subscribe(res => {
        expect(res).toEqual(dummyJson);
        done();
      });
    });
  }); // .list

});
