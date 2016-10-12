import {RequestOptions, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {JsonHttp} from "../app/core/services";

export * from './helpers';

export const APP_TEST_HTTP_PROVIDERS = [
  MockBackend,
  {
    provide: JsonHttp,
    useFactory: (mockBackend: MockBackend, requestOptions: RequestOptions) => {
      const http = new Http(mockBackend, requestOptions);
      return new JsonHttp(http);
    },
    deps: [MockBackend, RequestOptions]
  },
];
