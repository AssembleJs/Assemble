import { Component, render } from './src';

const start = new Date();

@Component({
  selector: 'name',
  props: {
    example: Boolean
  }
})
class Name {
  name = 'Chase';
  number = 0;

  onClick() {
    this.number++;
  }
}

@Component({
  selector: 'countdown',
  template: 'Countdown {{ value }}'
})
class Countdown {
  value = 100;

  constructor() {
    setInterval(() => {
      this.value--;
    }, 1500);
  }
}

@Component({
  selector: 'largeRender',
  template: `
    <div class="test" *for='let item of items'>
     {{ item }} {{ name }}
    </div>
  `
})
class LargeRender {
  name = 'Test';
  items = [1, 2, 3, 4];
}

render();

const now = new Date();
console.log(`>> Benchmark, initial render ${now.getTime() - start.getTime()}ms`);