import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";
import {Response} from "angular2/http";
import {Http} from "app/http";
import {Micropost} from "app/interfaces";
import {LoginService} from "app/services";

const url = '/api/microposts';

@Injectable()
export class MicropostService {

  constructor(private http:Http,
              private loginService:LoginService) {
  }

  create(content:string):Observable<Response> {
    const body = JSON.stringify({content: content});
    return this.http.post(url, body);
  }

  delete(id:Number):Observable<Response> {
    return this.http.delete(`${url}/${id}`);
  }

  isMyPost(post:Micropost) {
    if (!this.loginService.currentUser()) return false;
    return post.user.id === this.loginService.currentUser().id;
  }
}
