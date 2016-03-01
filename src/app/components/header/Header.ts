import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Router, ROUTER_DIRECTIVES, Location} from "angular2/router";
import {LoginService} from "app/services";

@Component({
  selector: 'app-header',
  template: require('./header.html'),
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
})
export class Header {

  isSignedIn:boolean;

  constructor(private router:Router,
              private location:Location,
              private loginService:LoginService) {
    this.isSignedIn = loginService.isSignedIn();
    router.subscribe(() => {
      this.isSignedIn = loginService.isSignedIn();
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
