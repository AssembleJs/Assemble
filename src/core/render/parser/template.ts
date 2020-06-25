import { Type } from '../model';
import { TEMPLATE_TAG } from '../../../constants';
import { registeredComponents } from '../../store';

const TEMPLATE_BRACKETS = /{{.*?}}/g;
const IS_FUNCTION = /\(.*?\)/g;

export class TemplateParser {

  host: DocumentFragment;

  constructor(
    private template: string
  ) {
  }

  parse(instance: Type<any>): DocumentFragment {
    const templates = this.host.querySelectorAll(TEMPLATE_TAG);

    templates.forEach(template => {
      this.parseTemplate(instance, template);
    });

    return this.host;
  }

  parseTemplate(instance: Type<any>, template: Element) {

    let rendered;
    if ((template as any).template) {
      rendered = template;
      template = (template as any).template;
    }

    const templateCode = template.innerHTML.trim();

    let data: any;
    if (templateCode.match(IS_FUNCTION)) {
      data = (instance as any)[templateCode].call();
    } else {
      data = (instance as any)[templateCode];
    }

    if (data === undefined) {
      return;
    }

    if (!rendered) {
      const node = document.createTextNode(data);
      template.replaceWith(node);
      (node as any).template = template;
    } else {
      (rendered as Node).textContent = data;
    }
  }

  parseEventTemplate(instance: Type<any>, templateCode: string) {
    if (templateCode.match(IS_FUNCTION)) {
      const functionName = templateCode.split('(')[0];
      (instance as any)[functionName].call(instance);
    }
  }

  setTree() {
    this.host = document.createDocumentFragment();
    const tempHost = document.createElement('host');
    tempHost.innerHTML = this.template;
    this.setTemplates(tempHost);
    tempHost.innerHTML = this.replaceWithTemplateBrackets();
    this.host.append(...(tempHost.childNodes as any));
    tempHost.remove();
  }

  private setTemplates(tempHost: HTMLElement) {
    const keys = Object.keys(registeredComponents);
    for (const key of keys) {
      const comp = registeredComponents[key];
      // Insert template
      if (comp.options.template) {
        const template = comp.options.template;
        const eles = tempHost.querySelectorAll(comp.options.selector);
        if (eles.length > 0) {
          eles.forEach(ele => {
            ele.innerHTML = template;
          });
        }
      }
    }

    this.template = tempHost.innerHTML;
  }

  private replaceWithTemplateBrackets(): string {
    const matches = this.template.match(TEMPLATE_BRACKETS);

    if (!matches) {
      return this.template;
    }

    let results = this.template;

    for (const match of matches) {
      let clean = match.slice(2).trim();
      clean = clean.slice(0, clean.length - 2).trim();
      if (!clean) {
        continue;
      }

      const assembleTemplate = `<${TEMPLATE_TAG}>${clean}</${TEMPLATE_TAG}>`;
      results = results.replace(match, assembleTemplate);
    }

    return results;
  }
}