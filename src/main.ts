import {bootstrap} from "@angular/platform-browser-dynamic";
import {ENV_PROVIDERS, decorateComponentRef} from "./platform/environment";
import {AppComponent, APP_PROVIDERS} from "./app";
import {PLATFORM_PROVIDERS} from "./platform/browser";

function main():Promise<any> {
  return bootstrap(AppComponent, [
    ...PLATFORM_PROVIDERS,
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS,
  ])
    .then(decorateComponentRef)
    .catch(e => console.error(e));
}

if ('development' === ENV && HMR === true) {
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}
