import {
  inject,
  beforeEachProviders,
  beforeEach,
  expect,
  describe,
  it
} from "angular2/testing";
import {Response, BaseResponseOptions, RequestMethod} from "angular2/http";
import {MockBackend} from "angular2/http/testing";
import {APP_TEST_PROVIDERS} from "app/providers";
import {MicropostService} from "app/services";
import {Micropost} from "app/interfaces";
import {LoginService} from "./LoginService";

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

  describe('.isMyPost', () => {
    let post:Micropost = {
      id: 1,
      content: 'some content',
      user: {
        id: 1,
        email: 'test1@test.com',
      },
      createdAt: 0,
    };
    let loginService:LoginService;
    beforeEach(inject([LoginService], _ => {
      loginService = _;
    }));

    it('returns false when not signed in', () => {
      expect(micropostService.isMyPost(post)).toBeFalsy();
    });
    it('returns false when not my post', () => {
      spyOn(loginService, 'currentUser').and.returnValue({id: 2});
      expect(micropostService.isMyPost(post)).toBeFalsy();
    });
    it('returns true when my post', () => {
      spyOn(loginService, 'currentUser').and.returnValue({id: 1});
      expect(micropostService.isMyPost(post)).toBeTruthy();
    });
  }); // .isMyPost

});
