import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";
import {
  Http as NgHttp,
  RequestOptionsArgs,
  RequestOptions,
  Headers,
  Response
} from "angular2/http";


const mergeAuthToken = (options:RequestOptionsArgs) => {
  let newOptions = new RequestOptions({}).merge(options);
  let newHeaders = new Headers(newOptions.headers);
  newHeaders.set('x-auth-token', localStorage.getItem('jwt'));
  newHeaders.set('accept', 'application/json');
  newHeaders.set('content-type', 'application/json');
  newOptions.headers = newHeaders;
  return newOptions;
};

@Injectable()
export class Http extends NgHttp {

  constructor(protected _backend:any, protected _defaultOptions:any) {
    super(_backend, _defaultOptions);
  }

  get(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.get(url, mergeAuthToken(options));
  }

  post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.post(url, body, mergeAuthToken(options));
  }

  put(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.put(url, body, mergeAuthToken(options));
  }

  delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.delete(url, mergeAuthToken(options));
  }

  patch(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.patch(url, body, mergeAuthToken(options));
  }

  head(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.head(url, mergeAuthToken(options));
  }

}
