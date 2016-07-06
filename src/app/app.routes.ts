import {RouterConfig} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {UserShowComponent} from "./components/user/user-show.component";

export const routes:RouterConfig = [
  {path: 'home', component: <any>HomeComponent},
  {path: 'users/:id', component: UserShowComponent},
];
