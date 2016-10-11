import {Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {UserShowComponent} from "./pages/user/user-show/user-show.component";
import {FollowingListComponent} from "./pages/relationship/following-list/following-list.component";
import {FollowerListComponent} from "./pages/relationship/follower-list/follower-list.component";
import {UserListComponent} from "./pages/user/user-list/user-list.component";
import {UserEditComponent} from "./pages/user/user-edit/user-edit.component";
import {ProfileDataResolver} from "./core/services/profile-data.resolver";
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
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
    component: FollowingListComponent,
    canActivate: [PrivatePageGuard]
  },
  {
    path: 'users/:id/followers',
    component: FollowerListComponent,
    canActivate: [PrivatePageGuard]
  },
  {
    path: 'users/me/edit',
    component: UserEditComponent,
    resolve: {profile: ProfileDataResolver},
    canActivate: [PrivatePageGuard],
  },
  {path: 'users/:id', component: UserShowComponent},
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [PrivatePageGuard]
  },
  {path: 'login', component: LoginComponent, canActivate: [PublicPageGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [PublicPageGuard]},
  {
    path: 'help',
    loadChildren: './pages/help/help.module#HelpModule'
  },
  {path: '', component: TopComponent, canActivate: [PublicPageGuard]},
  {path: '**', component: NoContentComponent}
];
