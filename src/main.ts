import "zone.js/dist/zone";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

// Avoid referencing Node's `process` in browser code — it is undefined in the
// browser and causes a runtime ReferenceError which prevents Angular bootstrap.
// Use Angular CLI environments or runtime flags for production builds instead.

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
