import {Injector} from "@angular/core";

let appInjectorRef:Injector;
export const appInjector = (injector?:Injector):Injector => {
  if (injector) {
    appInjectorRef = injector;
  }

  return appInjectorRef;
};
