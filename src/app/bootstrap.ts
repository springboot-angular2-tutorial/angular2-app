import {bootstrap} from "angular2/bootstrap";
import {ROUTER_PROVIDERS} from "angular2/router";
import {FORM_PROVIDERS} from "angular2/common";
import {HTTP_PROVIDERS} from "angular2/http";
import {ELEMENT_PROBE_PROVIDERS} from "angular2/platform/common_dom";
import {App} from "app/components";
import {APP_PROVIDERS} from "app/providers";
import {ComponentRef} from "angular2/core";
import {appInjector} from "./app-injector";

export function main() {
  return bootstrap(App, [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    ELEMENT_PROBE_PROVIDERS,
    APP_PROVIDERS,
  ]).then((appRef:ComponentRef) => {
    appInjector(appRef.injector);
  }).catch(e => console.error(e));
}

document.addEventListener('DOMContentLoaded', main);
