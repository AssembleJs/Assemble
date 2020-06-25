import { registeredComponents, registeredGenerators } from '../../store';
import { IComponentInternal } from '../../component/model';
import { TEMPLATE_TAG } from '../../../constants';
import { TemplateParser } from './template';

const IS_EVENT = /^\(.+\)$/;
const IS_GENERATOR = /(^\*([a-zA-Z\-])+)/g;

export class TreeParser {
  constructor(
    private host: HTMLElement | DocumentFragment | Element,
    private parent: IComponentInternal,
    private instance: any,
    private templateParser: TemplateParser
  ) {

  }

  traverse() {
    return this.traverseNode(this.host);
  }

  private traverseNode(node: HTMLElement | DocumentFragment | Element) {
    let templates: Element[] = [];
    for (const child of node.childNodes) {
      if (child instanceof Element) {
        if (child.tagName === TEMPLATE_TAG.toUpperCase()) {
          templates.push(child);
        }

        this.setEvents(child);
        this.setGenerators(child);

        const found = registeredComponents[child.tagName];

        if (!found) {
          templates = templates.concat(this.traverseNode(child));
          continue;
        }

        found.render(this.parent, child);
      } else if ((child as any).template) {
        templates.push(child as Element);
      }
    }

    return templates;
  }

  private setGenerators(child: Element) {
    for (const attr of child.attributes) {
      if (attr.name.match(IS_GENERATOR)) {
        const name = attr.name.replace('*', '');
        const generator = registeredGenerators[name];
        if (!generator) {
          throw new Error(`Unknown generator ${name}`);
        }

        generator.render(attr.value, this.instance, child);
      }
    }
  }

  private setEvents(child: Element) {
    for (const attr of child.attributes) {
      if (attr.name.match(IS_EVENT)) {
        const eventName = 'on' + attr.name.replace(/[()]/g, '').trim();
        (child as any)[eventName] = this.eventCallback.bind(this, attr.textContent || '');
      }
    }
  }

  private eventCallback(templateCode: string) {
    this.templateParser.parseEventTemplate(this.instance, templateCode);
  }
}