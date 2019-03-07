import DataManager from '../static/DataManager';

test("should return filtered data", () => {
  const instance = new DataManager({});
  instance.filter = jest.fn(() => true);
  instance.sort = jest.fn();
  instance.json = [1, 2, 3];
  const data = instance.getData();
  expect(data.length).toBe(3);
  expect(instance.filter).toHaveBeenCalledTimes(3);
  expect(instance.sort).toHaveBeenCalledTimes(2);
});

test("should return empty array", () => {
  const instance = new DataManager({});
  instance.filter = jest.fn(() => true);
  instance.sort = jest.fn();
  const data = instance.getData();
  expect(data.length).toBe(0);
  expect(instance.filter).toHaveBeenCalledTimes(0);
  expect(instance.sort).toHaveBeenCalledTimes(0);
});
