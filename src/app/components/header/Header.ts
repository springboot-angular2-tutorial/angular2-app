import {Component, View} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Router, ROUTER_DIRECTIVES, Location} from "angular2/router";
import {LoginService} from "app/services";
import {User} from "app/interfaces";

@Component({
  selector: 'app-header',
})
@View({
  template: require('./header.html'),
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
})
export class Header {

  currentUser:User;

  constructor(private router:Router,
              private location:Location,
              private loginService:LoginService) {
    this.currentUser = loginService.currentUser();
    router.subscribe(() => {
      this.currentUser = loginService.currentUser();
    });
  }

  isActive(path:string):boolean {
    return this.location.path() === path;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/Login']);
  }
}
