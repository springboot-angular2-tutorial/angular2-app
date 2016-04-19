import {provide, DirectiveResolver} from "angular2/core";
import {Http, HTTP_PROVIDERS, XHRBackend, RequestOptions} from "angular2/http";
import {MockBackend} from "angular2/http/testing";
import {Router, RouteRegistry, Location} from "angular2/router";
import {SpyLocation} from "angular2/src/mock/location_mock";
import {RootRouter} from "angular2/src/router/router";
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
  DirectiveResolver,
  provide(Location, {useClass: SpyLocation}),
  provide(Router, {useClass: RootRouter}),
];

const APP_TEST_SERVICE_PROVIDERS = APP_SERVICE_PROVIDERS;

export const APP_TEST_PROVIDERS = [
  APP_TEST_SERVICE_PROVIDERS,
  APP_TEST_ROUTER_PROVIDERS,
  APP_TEST_HTTP_PROVIDERS,
];
