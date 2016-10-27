import {Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {ProfileDataResolver} from "./core/services/profile-data.resolver";
import {AuthComponent} from "./pages/login/login.component";
import {TopComponent} from "./pages/top/top.component";
import {PrivatePageGuard} from "./core/services/private-page.guard";
import {PublicPageGuard} from "./core/services/public-page.guard";
import {NoContentComponent} from "./pages/no-content/no-content.component";

export const ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [PrivatePageGuard]
  },
  {
    path: 'users/:id/followings',
    loadChildren: './pages/+following-list/following-list.module#FollowingListModule',
    canActivate: [PrivatePageGuard]
  },
  {
    path: 'users/:id/followers',
    loadChildren: './pages/+follower-list/follower-list.module#FollowerListModule',
    canActivate: [PrivatePageGuard]
  },
  {
    path: 'users/me/edit',
    loadChildren: './pages/+user-edit/user-edit.module#UserEditModule',
    resolve: {profile: ProfileDataResolver},
    canActivate: [PrivatePageGuard],
  },
  {
    path: 'users/:id',
    loadChildren: './pages/+user-show/user-show.module#UserShowModule',
  },
  {
    path: 'users',
    loadChildren: './pages/+user-list/user-list.module#UserListModule',
    canActivate: [PrivatePageGuard],
  },
  {path: 'login', component: AuthComponent, canActivate: [PublicPageGuard]},
  {
    path: 'signup',
    loadChildren: './pages/+signup/signup.module#SignupModule',
    canActivate: [PublicPageGuard],
  },
  {
    path: 'help',
    loadChildren: './pages/+help/help.module#HelpModule',
  },
  {path: '', component: TopComponent, canActivate: [PublicPageGuard]},
  {path: '**', component: NoContentComponent}
];
