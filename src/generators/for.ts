import { Generator } from '../decorators/generator';
import { IGenerator } from '../core/generator/model';

const FOR_MATCH = /let (\w+) of (\w+)/g;

@Generator({
  selector: 'for'
})
export class For implements IGenerator {

  private property = '';

  constructor(
    public generatorValue: string,
    public instance: any,
    public element: Element) {
      this.ensureSyntax();
      this.setProperty();
      this.ensureInstanceProperty();
      this.cleanupElement();
  }

  render() {
    if (!this.isInstanceIterable()) {
      this.element.innerHTML = '';
      return;
    }

    const instanceProperty = this.instance[this.property];
    const len = instanceProperty.length;
    for (let i = 0; i < len; i++) {
      const cloned = this.element.cloneNode(true) as HTMLElement;
      this.element.parentElement?.insertBefore(cloned, this.element);
    }

    this.element.parentElement?.removeChild(this.element);
  }

  private cleanupElement() {
    this.element.attributes.removeNamedItem('*for');
  }

  private ensureInstanceProperty() {
    if (!this.instance[this.property]) {
      throw new Error(`Property ${this.property} not found in for generator`);
    }
  }

  private isInstanceIterable() {
    const instanceProperty = this.instance[this.property];
    if (instanceProperty === null) {
      return false;
    }
    return typeof instanceProperty[Symbol.iterator] === 'function';
  }

  private ensureSyntax() {
    if (!this.generatorValue.match(FOR_MATCH)) {
      throw new Error(`Invalid use of generator for`);
    }
  }

  private setProperty() {
    this.property = this.generatorValue.replace(FOR_MATCH, '$2');
  }
}