import { initComponentInternal } from '../core/component';
import { IComponentOptions } from '../core/component/model';
import { Type } from '../core/render/model';

export function Component(options: IComponentOptions) {
  return (constructor: Type<any>) => {
    initComponentInternal(constructor, options);
  }
}