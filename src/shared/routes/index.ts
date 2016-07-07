import {provide} from "@angular/core";
import {
  Router, RouteRegistry,
  ROUTER_PRIMARY_COMPONENT
} from "@angular/router-deprecated";
import {RootRouter} from "@angular/router-deprecated/src/router";
import {Location} from "@angular/common";
import {SpyLocation} from "@angular/common/testing";
import {AppComponent} from "../../app/app.component";
import {ProfileDataResolver} from "./profile-data.resolver";

export * from './route-helpers';
export * from './profile-data.resolver';

export const APP_RESOLVER_PROVIDERS = [
  ProfileDataResolver
];

export const APP_TEST_ROUTER_PROVIDERS = [
  RouteRegistry,
  provide(Location, {useClass: SpyLocation}),
  provide(Router, {useClass: RootRouter}),
  provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
];
