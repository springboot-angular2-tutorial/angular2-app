import {ComponentRef, enableProdMode} from "angular2/core";
import {bootstrap} from "angular2/bootstrap";
import {ROUTER_PROVIDERS} from "angular2/router";
import {FORM_PROVIDERS} from "angular2/common";
import {HTTP_PROVIDERS} from "angular2/http";
import {ELEMENT_PROBE_PROVIDERS} from "angular2/platform/common_dom";
import {App} from "app/components";
import {APP_PROVIDERS} from "app/providers";
import {appInjector} from "app/app-injector";

require("expose?$!expose?jQuery!jquery");
require('bootstrap-loader');
require("!style!css!toastr/build/toastr.css");

const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrap(App, [
    ...FORM_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS,
  ]).then((appRef:ComponentRef) => {
    appInjector(appRef.injector);
  }).catch(e => console.error(e));
});


declare let module:any;
if (module.hot) {
  bootstrap(App, [
    ...FORM_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS,
  ]).then((appRef:ComponentRef) => {
    appInjector(appRef.injector);
  }).catch(e => console.error(e));

  module.hot.accept();
}
