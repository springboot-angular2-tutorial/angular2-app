import {RouterConfig} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {UserShowComponent} from "./components/user/user-show.component";
import {FollowingListComponent} from "./components/relationship/following-list.component";
import {FollowerListComponent} from "./components/relationship/follower-list.component";
import {UserListComponent} from "./components/user/user-list.component";

export const routes:RouterConfig = [
  {path: 'home', component: <any>HomeComponent},
  {path: 'users/:id', component: UserShowComponent},
  {path: 'users/:id/followings', component: FollowingListComponent},
  {path: 'users/:id/followers', component: FollowerListComponent},
  {path: 'users', component: UserListComponent},
];
