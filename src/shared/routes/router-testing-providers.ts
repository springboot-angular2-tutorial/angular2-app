import {Location, LocationStrategy} from "@angular/common";
import {
  RouterOutletMap,
  UrlSerializer,
  DefaultUrlSerializer,
  Router,
  ActivatedRoute,
  RouterConfig
} from "@angular/router";
import {SpyLocation} from "@angular/common/testing";
import {ComponentResolver, Injector, Type} from "@angular/core";
import {MockLocationStrategy} from "./mock-location-strategy";

export const provideFakeRouter = (rootComponentType:Type, config:RouterConfig = []) => {
  return [
    RouterOutletMap,
    {provide: UrlSerializer, useClass: DefaultUrlSerializer},
    {provide: Location, useClass: SpyLocation},
    {provide: LocationStrategy, useClass: MockLocationStrategy},
    {
      provide: Router,
      useFactory: (resolver:ComponentResolver, urlSerializer:UrlSerializer,
                   outletMap:RouterOutletMap, location:Location, injector:Injector) => {
        return new Router(
          rootComponentType, resolver, urlSerializer, outletMap, location, injector, config);
      },
      deps: [ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector]
    },
    {
      provide: ActivatedRoute,
      useFactory: (r:Router) => r.routerState.root,
      deps: [Router]
    },
  ];
};
