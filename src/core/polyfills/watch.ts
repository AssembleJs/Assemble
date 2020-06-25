// tslint:no-shadowed-variable
if (!(Object.prototype as any).watch) {
  Object.defineProperty(Object.prototype, 'watch', {
    enumerable: false,
    configurable: true,
    writable: false,
    value (prop: any, handler: any){
      let oldVal = this[prop];
      let newVal = oldVal;
      const getter = () => newVal;

      const setter = (val: any) => {
        oldVal = newVal;
        newVal = val;
        handler.call((this), prop, oldVal, val);
      };

      if (delete this[prop]) {
        Object.defineProperty(this, prop, { get: getter, set: setter, enumerable: true, configurable: true });
      }
    }
  });
}

if (!(Object.prototype as any).unwatch) {
  Object.defineProperty(Object.prototype, 'unwatch', {
    enumerable: false,
    configurable: true,
    writable: false,
    value (prop: any) {
      const val = this[prop];
      delete this[prop];
      this[prop] = val;
    }
  });
}