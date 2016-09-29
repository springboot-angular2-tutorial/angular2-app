import {Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {UserShowComponent} from "./user/user-show/user-show.component";
import {FollowingListComponent} from "./pages/relationship/following-list/following-list.component";
import {FollowerListComponent} from "./pages/relationship/follower-list/follower-list.component";
import {UserListComponent} from "./pages/user/user-list/user-list.component";
import {HelpComponent} from "./pages/help/help.component";
import {UserEditComponent} from "./pages/user/user-edit/user-edit.component";
import {ProfileDataResolver} from "../shared/routes/profile-data.resolver";
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {TopComponent} from "./pages/top/top.component";
import {PrivatePageGuard} from "./core/services/private-page.guard";
import {PublicPageGuard} from "./core/services/public-page.guard";

export const ROUTES: Routes = [
  {path: '', component: TopComponent, canActivate: [PublicPageGuard]},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [PrivatePageGuard]
  },
  {path: 'users/:id', component: UserShowComponent},
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
    path: 'users',
    component: UserListComponent,
    canActivate: [PrivatePageGuard]
  },
  {path: 'help', component: HelpComponent},
  {
    path: 'users/me/edit',
    component: UserEditComponent,
    resolve: {profile: ProfileDataResolver},
    canActivate: [PrivatePageGuard],
  },
  {path: 'login', component: LoginComponent, canActivate: [PublicPageGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [PublicPageGuard]},
];
