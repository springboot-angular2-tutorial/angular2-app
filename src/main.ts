import {ComponentRef} from "@angular/core";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {FORM_PROVIDERS} from "@angular/common";
import {HTTP_PROVIDERS} from "@angular/http";
import {App} from "app/components";
import {APP_PROVIDERS} from "app/providers";
import {appInjector} from "app/app-injector";
import {ENV_PROVIDERS} from "./platform/environment";

require("expose?$!expose?jQuery!jquery");
require('bootstrap-loader');
require("!style!css!toastr/build/toastr.css");

function main():Promise<any> {
  return bootstrap(App, [
    ...FORM_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS,
  ]).then((appRef:ComponentRef<any>) => {
    appInjector(appRef.injector);
  }).catch(e => console.error(e));
}

if ('development' === ENV && HMR === true) {
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}
