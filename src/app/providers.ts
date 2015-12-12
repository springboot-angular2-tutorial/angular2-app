import {provide, DirectiveResolver} from 'angular2/angular2';
import {BaseRequestOptions, HTTP_PROVIDERS, XHRBackend} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {Router, RouteRegistry, Location} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {RootRouter} from 'angular2/src/router/router';

import {Http} from 'app/http';
import {App} from 'app/components';
import {
  ErrorHandler,
  FeedService,
  LoginService,
  MicropostService,
  RelationshipService,
  UserMicropostService,
  UserService,
} from 'app/services';

const APP_HTTP_PROVIDERS = [
  HTTP_PROVIDERS,
  XHRBackend,
  BaseRequestOptions,
  provide(Http, {
    useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
    deps: [XHRBackend, BaseRequestOptions],
  }),
];

const APP_SERVICE_PROVIDERS = [
  ErrorHandler,
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
  BaseRequestOptions,
  MockBackend,
  provide(Http, {
    useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
    deps: [MockBackend, BaseRequestOptions],
  }),
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
