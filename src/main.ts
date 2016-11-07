import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app";
import {decorateModuleRef} from "./app/environment";
import {bootloader} from "@angularclass/hmr";

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}

// needed for hmr
bootloader(main);

