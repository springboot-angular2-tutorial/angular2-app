import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {
  Http,
  RequestOptionsArgs,
  RequestOptions,
  Response,
  Headers
} from "@angular/http";

const mergeAuthToken = (options: RequestOptionsArgs) => {
  let newOptions = new RequestOptions({}).merge(options);
  let newHeaders = new Headers(newOptions.headers);
  newHeaders.set('x-auth-token', localStorage.getItem('jwt'));
  newOptions.headers = newHeaders;
  return newOptions;
};

@Injectable()
export class JsonHttp {

  constructor(private http: Http, private baseUrl: string = '') {
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(this.baseUrl + url, mergeAuthToken(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(this.baseUrl + url, body, mergeAuthToken(options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(this.baseUrl + url, body, mergeAuthToken(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(this.baseUrl + url, mergeAuthToken(options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(this.baseUrl + url, body, mergeAuthToken(options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.head(this.baseUrl + url, mergeAuthToken(options));
  }

}
