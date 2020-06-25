import { registeredComponents } from './core/store';
import { ROOT_SELECTOR } from './constants';
import './components';
import './generators';

export function render() {
  const component = registeredComponents[ROOT_SELECTOR.toUpperCase()];
  component.render();
}