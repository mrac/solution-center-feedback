/**
 * File used only by Karma
 */
require('phantomjs-polyfill');

requireAll((<any>require).context('./', true, /spec.ts$/));
function requireAll(r: any): any {
  r.keys().forEach(r);
}
