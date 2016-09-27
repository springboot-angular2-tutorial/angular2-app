import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../../services";

@Component({
  selector: 'mpt-header',
  templateUrl: './header.html',
})
export class HeaderComponent implements OnInit {

  isSignedIn: boolean;

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit(): any {
    this.isSignedIn = this.loginService.isSignedIn();
    this.loginService.events.subscribe(() => {
      this.isSignedIn = this.loginService.isSignedIn();
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
