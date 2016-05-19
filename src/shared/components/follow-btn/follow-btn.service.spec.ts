import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {Response, BaseResponseOptions, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {FollowBtnService} from "./follow-btn.service";
import {APP_TEST_PROVIDERS} from "../../../app";

describe('FollowBtnService', () => {

  let relationshipService:FollowBtnService;
  let backend:MockBackend;

  beforeEachProviders(() => [APP_TEST_PROVIDERS, FollowBtnService]);
  beforeEach(inject([FollowBtnService, MockBackend], (..._) => {
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
