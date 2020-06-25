import { registeredComponents } from './core/store';
import { ROOT_SELECTOR } from './constants';
import './components';
import './generators';

export function render(ele: HTMLElement | null) {
  const component = registeredComponents[ROOT_SELECTOR.toUpperCase()];
  component.render(undefined, ele as any);
}