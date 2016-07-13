import {Http, HTTP_PROVIDERS, XHRBackend, RequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {MyHttp} from "./http";

export * from './http';

export const APP_HTTP_PROVIDERS = [
  HTTP_PROVIDERS,
  {
    provide: MyHttp,
    useFactory: (xhrBackend:XHRBackend, requestOptions:RequestOptions) => {
      const ngHttp = new Http(xhrBackend, requestOptions);
      return new MyHttp(ngHttp);
    },
    deps: [XHRBackend, RequestOptions]
  },
];

export const APP_TEST_HTTP_PROVIDERS = [
  HTTP_PROVIDERS,
  MockBackend,
  {
    provide: MyHttp,
    useFactory: (mockBackend:MockBackend, requestOptions:RequestOptions) => {
      const http = new Http(mockBackend, requestOptions);
      return new MyHttp(http);
    },
    deps: [MockBackend, RequestOptions]
  },
];
