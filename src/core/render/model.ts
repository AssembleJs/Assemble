import { IComponentInternal } from '../component/model';

export interface IRender {
  render(parent?: IComponentInternal, element?: Element): void;
}

export type Type<T> = new (...args: any[]) => T;