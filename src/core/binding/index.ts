import '../polyfills/watch';

export interface IWatchableObject {
  watch: (key: string, handler: any) => any;
  unwatch: (key: string) => void;
}

export type WatcherCallback = (prop: string, previous: any, next: any) => void;

export class Binding {

  private callback: WatcherCallback;

  constructor(
    private instance: IWatchableObject
  ) {
  }

  destroy() {
    const keys = Object.keys(this.instance);
    for (const key of keys) {
      this.instance.unwatch(key);
    }
  }

  setCallback(callback: WatcherCallback) {
    this.callback = callback;
    this.setWatchers();
  }

  private watcher(prop: string, previous: any, next: any) {
    this.callback(prop, previous, next);
  }

  private setWatchers() {
    const keys = Object.keys(this.instance);
    const binding = this.watcher.bind(this);
    for (const key of keys) {
      if (this.instance.watch) {
        this.instance.watch(key, binding);
      }
    }
  }
}