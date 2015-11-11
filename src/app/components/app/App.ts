import {View, Component} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

import {SecurityRouterOutlet} from 'app/routes';
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
} from 'app/components';

require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");
require('!style!css!toastr/build/toastr.css');

@Component({
  selector: 'app'
})
@View({
  styles: [require('./app.scss')],
  template: require('./app.html'),
  directives: [SecurityRouterOutlet, Header],
})
@RouteConfig([
  {path: '/home', as: 'Home', component: HomePage},
  {path: '/login', as: 'Login', component: LoginPage},
  {path: '/signup', as: 'Signup', component: SignupPage},
  {path: '/users', as: 'UserList', component: UserListPage},
  {path: '/users/:id', as: 'UserShow', component: UserShowPage},
  {path: '/users/me/edit', as: 'MeEdit', component: UserEditPage},
  {
    path: '/users/:id/followings',
    as: 'FollowingList',
    component: FollowingListPage
  },
  {
    path: '/users/:id/followers',
    as: 'FollowerList',
    component: FollowerListPage
  },
  {path: '/help', as: 'Help', component: HelpPage},
  {path: '/', as: 'Top', component: TopPage},
])
export class App {
}
