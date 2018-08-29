import { Injector } from './../injector';
import 'reflect-metadata';

export interface RootConfig {
  services: Array<any>;
}

export function AppRoot(config: RootConfig) {
  return <returnFunc extends Function>(target: returnFunc): returnFunc => {
    // The new constructor that we define
    var ctor: Function;

    ctor = function () {
      // Create root injector
      const injector = new Injector();

      // Register all injectables in the injector
      config.services.forEach(service => {
        injector.getInstance(service);
      });

      // Add the injector to the prototype
      target.prototype.injector = injector;
    };

    // FIXME: Prototypes do not match due to functional nature
    // Does this matter? Should the user be able to access the injector or inject services to the AppRoot?
    ctor.prototype = Object.create(target.prototype);
    ctor.prototype.constructor = target;
    return <returnFunc>ctor;
  }
}
