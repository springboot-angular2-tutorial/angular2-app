import {platformBrowser} from "@angular/platform-browser";
import {AppModuleNgFactory} from "../build/src/app/app.module.ngfactory";

platformBrowser()
  .bootstrapModuleFactory(AppModuleNgFactory)
  .catch(err => console.error(err));
