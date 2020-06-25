import { IComponentInternal } from '../component/model';
import { IRender } from './model';
import { TemplateParser } from './parser/template';
import { ROOT_SELECTOR } from '../../constants';
import { TreeParser } from './parser/tree';
import { Binding, IWatchableObject } from '../binding';

export class Render implements IRender {

  private isRoot = false;

  constructor(
    private component: IComponentInternal
  ) {
    this.isRoot = component.options.selector === ROOT_SELECTOR;
  }

  render(parent?: IComponentInternal, element?: Element) {
    const options = this.component.options;
    if (this.isRoot) {
      if (!parent && element) {
        this.renderEle(element);
      } else {
        const eles = document.querySelectorAll(options.selector);
        eles.forEach(this.renderEle.bind(this));
      }
    }

    if (parent && element) {
      this.renderEle(element);
    }
  }

  private renderEle(ele: Element) {
    const internal = new RenderInternal(this.component, ele, this.isRoot);
    internal.render();
  }
}

class RenderInternal {

  private treeParser: TreeParser;
  private binding: Binding;
  private instance: any;

  constructor(
    private component: IComponentInternal,
    private ele: Element,
    private isRoot: boolean
  ) {
    this.template = this.component.options.template || this.ele.innerHTML;
    this.templateParser = new TemplateParser(this.template);

    if (this.isRoot) {
      this.templateParser.setTree();
    }
  }

  template = '';

  private templateParser: TemplateParser;

  render() {
    this.instance = new (this.component.constructorFunction as any)();
    this.setWatchers(this.instance);

    if (this.isRoot) {
      const host = this.templateParser.parse(this.instance);
      this.treeParser = new TreeParser(
        host,
        this.component,
        this.instance,
        this.templateParser);
      this.treeParser.traverse();

      this.ele.innerHTML = '';
      this.ele.appendChild(host);
    } else {
      this.treeParser = new TreeParser(
        this.ele,
        this.component,
        this.instance,
        this.templateParser);

      console.log(this.ele, this.component.options);
      const templates = this.treeParser.traverse();
      templates.forEach(template => {
        this.templateParser.parseTemplate(this.instance, template);
      });
    }

    (this.ele as any).instance = this.instance;
  }

  private rerender() {
    const templates = this.treeParser.traverse();
    templates.forEach(template => {
      this.templateParser.parseTemplate(this.instance, template);
    });
  }

  private setWatchers(instance: IWatchableObject) {
    if (this.binding) {
      return;
    }

    this.binding = new Binding(instance);
    this.binding.setCallback(() => {
      this.rerender();
    });
  }
}