import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/login.service";

@Component({
  selector: 'mpt-header',
  styleUrls: ['header.component.css'],
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {

  isSignedIn: boolean;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.isSignedIn();
    this.authService.events.subscribe(() => {
      this.isSignedIn = this.authService.isSignedIn();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
