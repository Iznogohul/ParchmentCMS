const utils = require('.');

describe('packageVersion', () => {
  it('should contain ', async () => {
    expect(utils.packageVersion()).toBe('1.0.0');
  });
});
describe('packageAuthor', () => {
  it('should not be undefined', async () => {
    expect(utils.packageAuthor()).not.toBeUndefined();
  });
});
describe('arrayIsEmpty', () => {
  it('should return true if array is empty', async () => {
    const emptyArray = [];
    expect(utils.arrayIsEmpty(emptyArray)).toBe(1);
  });
  it('should return false if array is not empty', async () => {
    const notEmptyArray = [{ test: 'test' }];
    expect(utils.arrayIsEmpty(notEmptyArray)).toBe(0);
  });
  it('should return false if provided input is not type of array', async () => {
    const input = '';
    expect(utils.arrayIsEmpty(input)).toBe(0);
  });
});
