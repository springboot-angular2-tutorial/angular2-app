import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app";
import {decorateModuleRef} from "./app/environment";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(decorateModuleRef)
  .catch(err => console.error(err));
