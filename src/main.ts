import {ComponentRef} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {ROUTER_PROVIDERS} from "angular2/router";
import {FORM_PROVIDERS} from "angular2/common";
import {HTTP_PROVIDERS} from "angular2/http";
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
  ]).then((appRef:ComponentRef) => {
    appInjector(appRef.injector);
  }).catch(e => console.error(e));
}

if ('development' === ENV && HMR === true) {
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}
