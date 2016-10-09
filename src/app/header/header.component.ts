import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../core/services/login.service";

@Component({
  selector: 'mpt-header',
  styleUrls: ['./header.css'],
  templateUrl: './header.html',
})
export class HeaderComponent implements OnInit {

  isSignedIn: boolean;

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
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
