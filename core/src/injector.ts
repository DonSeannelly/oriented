import 'reflect-metadata';

export class Injector {
  private injectables: Map<any, Object>;

  constructor() {
    this.injectables = new Map<any, Object>();
  }

  getInstance(injectable) {
    if (this.injectables.has(injectable.prototype.constructor.name)) 
      return this.injectables.get(injectable.prototype.constructor.name);
    else return this.register(injectable);
  }
  register(injectable) {
    // The injectable class's dependencies
    let dependencies = [];
    // Get parameter types of the constructor to resolve objects needed
    var types = Reflect.getMetadata("design:paramtypes", injectable.prototype.constructor);
    if (types) {
      types.forEach(element => {
        dependencies.push(this.getInstance(element));
      });
    }
    this.injectables.set(injectable.prototype.constructor.name, new (injectable.prototype.constructor)(...dependencies));

    return this.injectables.get(injectable.prototype.constructor.name);
  }
}