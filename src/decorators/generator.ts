import { IGeneratorOptions, IGenerator } from '../core/generator/model';
import { Type } from '../core/render/model';
import { initGeneratorInternal } from '../core/generator';

export function Generator(options: IGeneratorOptions) {
  return (constructor: Type<IGenerator>) => {
    initGeneratorInternal(constructor, options);
  };
}