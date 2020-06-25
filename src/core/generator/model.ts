import { Type } from '../render/model';

export interface IGeneratorOptions {
  selector: string;
}

export interface IGeneratorInternal {
  constructorFunction: Type<any>;
  options: IGeneratorOptions;
  render(value: string, instance: any, element: Element): void;
}

export interface IRegisteredGenerator {
  [selector: string]: IGeneratorInternal;
}

export interface IGenerator {
  generatorValue: string;
  instance: any;
  element: Element;

  render(): void;
}