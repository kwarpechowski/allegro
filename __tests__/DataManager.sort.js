import DataManager from '../static/DataManager';

describe('', () => {
  let instance;
  beforeEach(() => {
    instance = new DataManager({});
    instance.sortValue = 'a';
    const mock = jest.fn(r => a => a[r]);
    DataManager.getValue = mock;
  });

  test('xx', () => {
    const t = instance.sort({a: 4}, {a: 2});
    expect(t).toBe(-2);
  });
  test('xx', () => {
    const t = instance.sort({a: 4}, {a: 4});
    expect(t).toBe(0);
  });
  test('xx', () => {
    const t = instance.sort({a: 1}, {a: 2});
    expect(t).toBe(1);
  });
  test('xx', () => {
    const t = instance.sort({a: 'a'}, {a: 'cc'});
    expect(t).toBe(-1);
  });
  test('xx', () => {
    const t = instance.sort({a: 'dd'}, {a: 'cc'});
    expect(t).toBe(1);
  });
  test('xx', () => {
    const t = instance.sort({a: 'dd'}, {a: 'dd'});
    expect(t).toBe(0);
  })
});