import {AppModuleNgFactory} from "../aot/src/app/app.module.ngfactory";
import {platformBrowser} from "@angular/platform-browser";

platformBrowser()
  .bootstrapModuleFactory(AppModuleNgFactory)
  .catch(err => console.error(err));
