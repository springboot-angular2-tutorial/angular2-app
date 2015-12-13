import {bootstrap} from "angular2/bootstrap";
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {FORM_PROVIDERS} from "angular2/common";
import {HTTP_PROVIDERS} from 'angular2/http';
import {ELEMENT_PROBE_PROVIDERS} from "angular2/src/platform/dom/debug/debug_element_view_listener";

import {App} from 'app/components';
import {APP_PROVIDERS} from 'app/providers'

bootstrap(App, [
  FORM_PROVIDERS,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  ELEMENT_PROBE_PROVIDERS,

  APP_PROVIDERS,
]);
