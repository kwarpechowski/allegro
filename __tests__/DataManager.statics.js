import DataManager from '../static/DataManager';

describe("Compare strings", () => {
  let comparator;

  beforeEach(() => {
    comparator = DataManager.compareStrings("Test");
  });

  test("che", () => {
    expect(comparator("asd")).toBe(false);
  });

  test("x2x2", () => {
    expect(comparator("test")).toBe(true);
  });

  test("x2x2", () => {
    expect(comparator("TEST")).toBe(true);
  });

  test("x2x2", () => {
    expect(comparator("Test ")).toBe(true);
  });
});

describe("Compare strings with whitespaces", () => {
  let comparator;

  beforeEach(() => {
    comparator = DataManager.compareStrings(" Test");
  });

  test("x2x2", () => {
    expect(comparator("Test ")).toBe(false);
  });
  test("x2x2", () => {
    expect(comparator("TEST")).toBe(false);
  });
});

describe("DataManager - getValue", () => {
  test("asd", () => {
    const value = DataManager.getValue("key")({ key: 1 });
    expect(value).toBe(1);
  });
  test("asd", () => {
    const value = DataManager.getValue("key.test")({ key: { test: 234 } });
    expect(value).toBe(234);
  });
  test("asd", () => {
    const value = DataManager.getValue("key")({ key: { test: 234 } });
    expect(value).toEqual({ test: 234 });
  });
  test("asd", () => {
    const value = DataManager.getValue("aasd")({ key: { test: 234 } });
    expect(value).toBeUndefined();
  });
});

describe("DataManager", () => {
  test("check constructor", () => {
    const instance = new DataManager({ url: "123", defaultSort: "asd" });
    expect(instance.clear).toBeTruthy();
    expect(instance.filterValue).toBe("");
    expect(instance.url).toBe("123");
    expect(instance.defaultSort).toBe("asd");
    expect(instance.json.length).toBe(0);
  });
});
