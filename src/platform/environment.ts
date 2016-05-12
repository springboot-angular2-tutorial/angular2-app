// Angular 2
import {enableProdMode} from '@angular/core';

let PROVIDERS = [];

if ('production' === ENV) {
  enableProdMode();
  PROVIDERS = [
    ...PROVIDERS,
  ];
} else {
  PROVIDERS = [
    ...PROVIDERS,
  ];
}

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
