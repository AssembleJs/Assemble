import { IGeneratorOptions, IGeneratorInternal, IGenerator } from './model';
import { Type } from '../render/model';
import { registeredGenerators } from '../store';

export function initGeneratorInternal(constructor: Type<IGenerator>, options: IGeneratorOptions) {
  registeredGenerators[options.selector] = new GeneratorInternal(constructor, options);
}

export class GeneratorInternal implements IGeneratorInternal {
  constructor(
    public constructorFunction: Type<IGenerator>,
    public options: IGeneratorOptions
  ) {
  }

  render(value: string, instance: any, element: Element) {
    const generatorInstance = new (this.constructorFunction)(value, instance, element);
    generatorInstance.render();

    // Let GC get rid of the instance
  }
}