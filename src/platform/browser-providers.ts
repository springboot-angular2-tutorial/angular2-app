import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

export const APPLICATION_PROVIDERS = [
  disableDeprecatedForms(),
  provideForms(),
  ...HTTP_PROVIDERS,
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
