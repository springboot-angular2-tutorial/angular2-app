import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {MyHttp} from "../http";
import {Subject} from "rxjs/Rx";

@Injectable()
export class LoginService {

  private authEvents: Subject<AuthEvent>;

  constructor(private http:MyHttp) {
    this.authEvents = new Subject<AuthEvent>();
  }

  login(email, password):Observable<Response> {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post('/api/login', body).do(resp => {
      localStorage.setItem('jwt', resp.headers.get('x-auth-token'));
      this.authEvents.next(new DidLogin());
    });
  }

  logout():void {
    localStorage.removeItem('jwt');
    this.authEvents.next(new DidLogout());
  }

  isSignedIn():boolean {
    return localStorage.getItem('jwt') !== null;
  }

  get events(): Observable<AuthEvent> { return this.authEvents; }

}

export class DidLogin {
}
export class DidLogout {
}

export type AuthEvent = DidLogin | DidLogout;

