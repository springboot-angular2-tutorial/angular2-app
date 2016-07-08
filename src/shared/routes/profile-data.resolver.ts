import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import {UserService} from "../services/user.service";

@Injectable()
export class ProfileDataResolver implements Resolve<any> {

  constructor(private userService:UserService) {
  }

  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    return this.userService.get('me');
  }

}
