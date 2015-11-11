import {bootstrap, FORM_PROVIDERS} from 'angular2/angular2';
import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';

import {App} from 'app/components';
import {APP_PROVIDERS} from 'app/bindings'

bootstrap(App, [
  FORM_PROVIDERS,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),

  APP_PROVIDERS,
]);
