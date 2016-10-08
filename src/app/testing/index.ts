import {RequestOptions, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {MyHttp} from "../core/http";

export * from './helpers';

export const APP_TEST_HTTP_PROVIDERS = [
  MockBackend,
  {
    provide: MyHttp,
    useFactory: (mockBackend: MockBackend, requestOptions: RequestOptions) => {
      const http = new Http(mockBackend, requestOptions);
      return new MyHttp(http);
    },
    deps: [MockBackend, RequestOptions]
  },
];
