import {inject, beforeEachProviders, beforeEach} from "@angular/core/testing";
import {Headers, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {LoginService} from "./login.service";
import {APP_TEST_PROVIDERS} from "../../app";

describe('LoginService', () => {

  let loginService:LoginService;
  let backend:MockBackend;

  beforeEachProviders(() => [APP_TEST_PROVIDERS]);
  beforeEach(inject([LoginService, MockBackend], (..._) => {
    [loginService, backend] = _;
  }));

  describe('.login', () => {
    it('can login', (done) => {
      backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({
          headers: new Headers({'x-auth-token': 'my jwt'}),
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

  describe('.isSignedIn', () => {
    describe('when not signed in', () => {
      it('should be false', () => {
        expect(loginService.isSignedIn()).toBeFalsy();
      });
    });

    describe('when signed in', () => {
      beforeEach(() => localStorage.setItem('jwt', 'dummy'));
      it('should be true', () => {
        expect(loginService.isSignedIn()).toBeTruthy();
      });
    });
  }); // .isSignedIn

});

