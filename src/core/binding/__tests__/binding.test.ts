import { Binding, IWatchableObject } from '..';

describe('Binding', () => {
  it('should crerate a new binding', () => {
    const obj = {
      a: 1,
      watch(key: string, handler: any) {

      },
      unwatch(key: string) {

      }
    } as IWatchableObject;

    const binding = new Binding(obj);
    expect(binding).toBeTruthy();
  });

  it('should call watch', () => {
    const previousValue = 1;
    const callback = jest.fn((a, b, c) => {});
    const obj = {
      a: previousValue,
      watch: callback,
      unwatch(key: string) {

      }
    } as any;

    const binding = new Binding(obj);
    binding.setCallback(() => {});

    expect(callback.mock.calls.length).toBe(3);
  });
});