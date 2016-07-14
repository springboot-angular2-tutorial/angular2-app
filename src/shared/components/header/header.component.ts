import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {
  Router,
  ROUTER_DIRECTIVES,
  Event,
  NavigationStart
} from "@angular/router";
import {LoginService} from "../../services";

@Component({
  selector: 'mpt-header',
  templateUrl: './header.html',
  directives: [ROUTER_DIRECTIVES],
})
export class HeaderComponent implements OnInit {

  isSignedIn:boolean;

  constructor(private router:Router,
              private location:Location,
              private loginService:LoginService) {
  }

  ngOnInit():any {
    this.isSignedIn = this.loginService.isSignedIn();
    // TODO subscribe custom event of loginService
    this.router.events.subscribe((e:Event) => {
      if (e instanceof NavigationStart) {
        this.isSignedIn = this.loginService.isSignedIn();
      }
    });
  }

  isActive(path:string):boolean {
    return this.location.path().split('?')[0] === path;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
