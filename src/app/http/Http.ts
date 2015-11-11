import {Injectable} from 'angular2/core';
import {
  Http as NgHttp,
  RequestOptionsArgs,
  RequestOptions,
  Headers,
  Response,
} from 'angular2/http';

import {HttpAuthError, HttpClientError, HttpServerError} from './HttpError'

const mergeAuthToken = (options:RequestOptionsArgs) => {
  let newOptions = new RequestOptions({}).merge(options);
  let newHeaders = new Headers(newOptions.headers);
  newHeaders.set('X-AUTH-TOKEN', localStorage.getItem('jwt'));
  newHeaders.set('Accept', 'application/json');
  newHeaders.set('Content-Type', 'application/json');
  newOptions.headers = newHeaders;
  return newOptions;
};

@Injectable()
export class Http extends NgHttp {

  constructor(protected _backend:any, protected _defaultOptions:any) {
    super(_backend, _defaultOptions);
  }

  static checkStatus(response:Response):void {
    if (response.status == 401) {
      throw new HttpAuthError(response.statusText, response);
    }
    if (response.status >= 400 && response.status < 500) {
      throw new HttpClientError(response.statusText, response);
    }
    if (response.status >= 500) {
      throw new HttpServerError(response.statusText, response);
    }
  }

  get(url:string, options?:RequestOptionsArgs):any {
    return super.get(url, mergeAuthToken(options))
      .do(Http.checkStatus)
      ;
  }

  post(url:string, body:string, options?:RequestOptionsArgs):any {
    return super.post(url, body, mergeAuthToken(options))
      .do(Http.checkStatus)
      ;
  }

  put(url:string, body:string, options?:RequestOptionsArgs):any {
    return super.put(url, body, mergeAuthToken(options))
      .do(Http.checkStatus)
      ;
  }

  delete(url:string, options?:RequestOptionsArgs):any {
    return super.delete(url, mergeAuthToken(options))
      .do(Http.checkStatus)
      ;
  }

  patch(url:string, body:string, options?:RequestOptionsArgs):any {
    return super.patch(url, body, mergeAuthToken(options))
      .do(Http.checkStatus)
      ;
  }

  head(url:string, options?:RequestOptionsArgs):any {
    return super.head(url, mergeAuthToken(options))
      .do(Http.checkStatus)
      ;
  }

}
