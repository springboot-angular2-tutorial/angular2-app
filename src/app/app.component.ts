import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {
  HelpComponent,
  HomeComponent,
  LoginComponent,
  SignupComponent,
  UserListComponent,
  UserEditComponent,
  UserShowComponent,
  FollowerListComponent,
  FollowingListComponent,
  TopComponent
} from "./components";
import {HeaderComponent} from "../shared/components";

@Component({
  selector: 'mpt-app',
  styles: [require('./app.scss')],
  template: require('./app.html'),
  // directives: [ROUTER_DIRECTIVES, HeaderComponent],
  directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
  {path: '/home', name: 'Home', component: HomeComponent},
  // {path: '/login', name: 'Login', component: LoginComponent},
  // {path: '/signup', name: 'Signup', component: SignupComponent},
  // {path: '/users', name: 'UserList', component: UserListComponent},
  // {path: '/users/:id', name: 'UserShow', component: UserShowComponent},
  // {path: '/users/me/edit', name: 'MeEdit', component: UserEditComponent},
  // {
  //   path: '/users/:id/followings',
  //   name: 'FollowingList',
  //   component: FollowingListComponent
  // },
  // {
  //   path: '/users/:id/followers',
  //   name: 'FollowerList',
  //   component: FollowerListComponent
  // },
  // {path: '/help', name: 'Help', component: HelpComponent},
  // {path: '/', name: 'Top', component: TopComponent},
])
export class AppComponent {
}
