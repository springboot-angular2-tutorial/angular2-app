import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {
  Header,
  HomePage,
  LoginPage,
  SignupPage,
  UserListPage,
  UserShowPage,
  UserEditPage,
  FollowerListPage,
  FollowingListPage,
  HelpPage,
  TopPage
} from "app/components";

@Component({
  selector: 'app',
  styles: [require('./app.scss')],
  template: require('./app.html'),
  directives: [ROUTER_DIRECTIVES, Header],
})
@RouteConfig([
  {path: '/home', name: 'Home', component: HomePage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/signup', name: 'Signup', component: SignupPage},
  {path: '/users', name: 'UserList', component: UserListPage},
  {path: '/users/:id', name: 'UserShow', component: UserShowPage},
  {path: '/users/me/edit', name: 'MeEdit', component: UserEditPage},
  {
    path: '/users/:id/followings',
    name: 'FollowingList',
    component: FollowingListPage
  },
  {
    path: '/users/:id/followers',
    name: 'FollowerList',
    component: FollowerListPage
  },
  {path: '/help', name: 'Help', component: HelpPage},
  {path: '/', name: 'Top', component: TopPage},
])
export class App {
}
