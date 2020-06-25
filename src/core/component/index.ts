import { COMPONENT_NAME } from '../../constants';
import { IComponentOptions, IComponentInternal } from './model';
import { IRender, Type } from '../render/model';
import { Render } from '../render';
import { registeredComponents } from '../store';

const internals = [];

export function initComponentInternal(constructor: Type<any>, options: IComponentOptions) {
  const comp = new ComponentInternal(options, constructor);
  internals.push(comp);
}

export class ComponentInternal implements IComponentInternal {

  renderer: IRender;

  constructor(
    public options: IComponentOptions,
    public constructorFunction: Type<any>
    ) {
    this.setSelector();
    this.setRegistered();

    this.renderer = new Render(this);
  }

  render(parent?: IComponentInternal, element?: Element): void {
    this.renderer.render(parent, element);
  }

  private setSelector() {
    (this.constructorFunction as any)[COMPONENT_NAME] = this.options.selector;
  }

  private setRegistered() {
    registeredComponents[this.options.selector.toUpperCase()] = this;
  }
}