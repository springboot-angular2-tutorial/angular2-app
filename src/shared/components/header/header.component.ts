import {Component} from "@angular/core";
import {CORE_DIRECTIVES, Location} from "@angular/common";
import {Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {LoginService} from "../../services";

@Component({
  selector: 'mpt-header',
  template: require('./header.html'),
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
})
export class HeaderComponent {

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
    return this.location.path().split('?')[0] === path;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/Login']);
  }
}
