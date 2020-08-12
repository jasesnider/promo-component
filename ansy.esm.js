import { p as patchBrowser, b as bootstrapLazy } from './index-e8484beb.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["input-component",[[1,"input-component",{"name":[1]}]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["promo-component",[[1,"promo-component",{"cc":[1],"promo":[32],"countdown":[32]}]]]], options);
});
