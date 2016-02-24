import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  it
} from "angular2/testing";
import {Headers, ResponseOptions, Response, RequestMethod} from "angular2/http";
import {MockBackend} from "angular2/http/testing";
import {APP_TEST_PROVIDERS} from "app/providers";
import {LoginService} from "app/services";

describe('LoginService', () => {

  var loginService:LoginService;
  var backend:MockBackend;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(inject([LoginService, MockBackend], (..._) => {
    [loginService, backend] = _;
  }));
  afterEach(() => localStorage.clear());

  describe('.login', () => {
    it('can login', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({
          headers: new Headers({'X-AUTH-TOKEN': 'my jwt'}),
        })));
        expect(conn.request.method).toEqual(RequestMethod.Post);
        expect(conn.request.url).toEqual('/api/login');
        expect(conn.request.text()).toEqual(JSON.stringify({
          email: 'test@test.com',
          password: 'secret',
        }));
      });
      loginService.login('test@test.com', 'secret').subscribe(() => {
        expect(localStorage.getItem('jwt')).toEqual('my jwt');
        done();
      });
    });
  }); // .login

  describe('.logout', () => {
    it('can logout', () => {
      localStorage.setItem('jwt', 'my jwt');
      loginService.logout();
      expect(localStorage.getItem('jwt')).toBeFalsy();
    });
  }); // .logout

  describe('.currentUser', () => {
    describe('when not signed in', () => {
      it('returns nothing', () => {
        expect(loginService.currentUser()).toBeFalsy();
      });
    });

    describe('when signed in', () => {
      beforeEach(() => {
        localStorage.setItem('jwt', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0OEB0ZXN0LmNvbSIsInVzZXJJZCI6MTd9.KKUI_-xoLRlouQ4MNYGRn7OkuLM0i8Frmwb5O5gvf1xgXse6sfqG10HiFwber9JSp9ZYh25n3MH_YwUowF9Xzw');
      });
      it('returns current user', () => {
        expect(loginService.currentUser()).toEqual({
          id: 17,
          email: 'test8@test.com',
        })
      });
    });
  }); // .currentUsr

});

