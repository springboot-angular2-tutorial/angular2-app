import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {MyHttp} from "../http";

@Injectable()
export class LoginService {

  constructor(private http:MyHttp) {
  }

  login(email, password):Observable<Response> {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post('/api/login', body).do(resp => {
      localStorage.setItem('jwt', resp.headers.get('x-auth-token'));
    });
  }

  logout():void {
    localStorage.removeItem('jwt');
  }

  isSignedIn():boolean {
    return localStorage.getItem('jwt') !== null;
  }

}
