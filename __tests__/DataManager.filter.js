import DataManager from '../static/DataManager';

test('should accept element in filtering', () => {
  const instance = new DataManager({});
  const mock = jest.fn();
  mock.mockReturnValue(() => true);
  DataManager.compareStrings = mock.bind();
  instance.filterValue = 'Hello my Reviewer';
  expect(instance.filter({ title: 'Hello my Reviewer' })).toBe(true);
});

test('should not accept element in filtering', () => {
  const instance = new DataManager({});
  const mock = jest.fn();
  mock.mockReturnValue(() => false);
  DataManager.compareStrings = mock.bind();
  instance.filterValue = 'asd';
  expect(instance.filter({ title: 'asd' })).toBe(false);
});

test('should accept, because filer value is undefined', () => {
  const instance = new DataManager({});
  expect(instance.filter({ title: 'asd' })).toBe(true);
});
