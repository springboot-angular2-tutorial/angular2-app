import {Response} from 'angular2/http';

class HttpResponseError extends Error {
  name:string = 'HttpResponseError';

  constructor(public message:string, public response?:Response) {
    super(message);
  }
}

// 4xx
export class HttpClientError extends HttpResponseError {
  name:string = 'HttpClientError';
}

// 401
export class HttpAuthError extends HttpClientError {
  name:string = 'HttpAuthError';
}

// 5xx
export class HttpServerError extends HttpResponseError {
  name:string = 'HttpServerError';
}
