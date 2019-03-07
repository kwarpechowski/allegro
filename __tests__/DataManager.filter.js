import DataManager from '../static/DataManager';

test("asd", () => {
  const instance = new DataManager({});
  const mock = jest.fn();
  mock.mockReturnValue(() => true);
  DataManager.compareStrings = mock.bind();
  instance.filterValue = 'asd';

  expect(instance.filter({ title: 'asd' })).toBe(true);
});

test("asd", () => {
  const instance = new DataManager({});
  const mock = jest.fn();
  mock.mockReturnValue(() => false);
  DataManager.compareStrings = mock.bind();
  instance.filterValue = 'asd';

  expect(instance.filter({ title: 'asd' })).toBe(false);
});

test("asd", () => {
  const instance = new DataManager({});

  expect(instance.filter({ title: 'asd' })).toBe(true);
});
