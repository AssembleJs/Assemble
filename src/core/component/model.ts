import { Type } from '../render/model';

export interface IComponentInternal {
  options: IComponentOptions;
  constructorFunction: Type<any>;

  render(parent?: IComponentInternal, element?: Element): void;
}

export interface IRegisteredComponent {
  [selector: string]: IComponentInternal;
}

export interface IComponentOptions {
  selector: string;
  template?: string;
  props?: IComponentProps;
}

export interface IComponentProps {
  [key: string]: object;
}