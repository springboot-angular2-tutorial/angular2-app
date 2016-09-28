import {inject, TestBed} from "@angular/core/testing";
import {
  Response,
  BaseResponseOptions,
  RequestMethod,
  HttpModule
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {FollowBtnService} from "./follow-btn.service";
import {APP_TEST_HTTP_PROVIDERS} from "../../core/http/index";

describe('FollowBtnService', () => {

  let followBtnService: FollowBtnService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        APP_TEST_HTTP_PROVIDERS,
        FollowBtnService,
      ],
    });
  });
  beforeEach(inject([FollowBtnService, MockBackend], (..._) => {
    [followBtnService, backend] = _;
  }));

  describe('.follow', () => {
    it('can follow user', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
        expect(conn.request.method).toEqual(RequestMethod.Post);
        expect(conn.request.url).toEqual('/api/relationships/to/1');
      });
      followBtnService.follow('1').subscribe(() => {
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
      followBtnService.unfollow('1').subscribe(() => {
        done();
      });
    });
  }); // .unfollow

});
