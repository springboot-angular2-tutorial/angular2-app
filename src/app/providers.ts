import {provide} from "@angular/core";
import {Http, HTTP_PROVIDERS, XHRBackend, RequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {Router, RouteRegistry} from "@angular/router-deprecated";
import {RootRouter} from "@angular/router-deprecated/src/router";
import {Location} from "@angular/common";
import {SpyLocation} from "@angular/common/testing";
import {MyHttp} from "app/http";
import {
  HttpErrorHandler,
  FeedService,
  LoginService,
  MicropostService,
  RelationshipService,
  UserMicropostService,
  UserService
} from "app/services";

const APP_HTTP_PROVIDERS = [
  HTTP_PROVIDERS,
  provide(MyHttp, {
    useFactory: (xhrBackend:XHRBackend, requestOptions:RequestOptions) => {
      const ngHttp = new Http(xhrBackend, requestOptions);
      return new MyHttp(ngHttp);
    },
    deps: [XHRBackend, RequestOptions]
  })
];

const APP_SERVICE_PROVIDERS = [
  HttpErrorHandler,
  FeedService,
  LoginService,
  MicropostService,
  RelationshipService,
  UserMicropostService,
  UserService,
];

export const APP_PROVIDERS = [
  APP_HTTP_PROVIDERS,
  APP_SERVICE_PROVIDERS,
];

// ---------------

const APP_TEST_HTTP_PROVIDERS = [
  HTTP_PROVIDERS,
  MockBackend,
  provide(MyHttp, {
    useFactory: (mockBackend:MockBackend, requestOptions:RequestOptions) => {
      const http = new Http(mockBackend, requestOptions);
      return new MyHttp(http);
    },
    deps: [MockBackend, RequestOptions]
  })
];

const APP_TEST_ROUTER_PROVIDERS = [
  RouteRegistry,
  provide(Location, {useClass: SpyLocation}),
  provide(Router, {useClass: RootRouter}),
];

const APP_TEST_SERVICE_PROVIDERS = APP_SERVICE_PROVIDERS;

export const APP_TEST_PROVIDERS = [
  APP_TEST_SERVICE_PROVIDERS,
  APP_TEST_ROUTER_PROVIDERS,
  APP_TEST_HTTP_PROVIDERS,
];
