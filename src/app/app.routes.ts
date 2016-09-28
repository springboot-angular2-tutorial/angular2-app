import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {UserShowComponent} from "./user/user-show.component";
import {FollowingListComponent} from "./relationship/following-list.component";
import {FollowerListComponent} from "./relationship/follower-list.component";
import {UserListComponent} from "./user/user-list.component";
import {HelpComponent} from "./help/help.component";
import {UserEditComponent} from "./user/user-edit.component";
import {ProfileDataResolver} from "../shared/routes/profile-data.resolver";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {TopComponent} from "./top/top.component";
import {PrivatePageGuard} from "../shared/services/private-page.guard";
import {PublicPageGuard} from "../shared/services/public-page.guard";

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
