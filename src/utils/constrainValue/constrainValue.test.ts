import constrainValue from "./constrainValue";

describe('constrainValue()', () => {
  it('should return min value if passed value is less that min', () => {
    // Arrange
    const value = - 1;
    const min = 0;
    const max = 10;

    // Act
    const result = constrainValue(value, min, max);

    expect(result).toBe(min);
  });

  it('should return max value if value passed is over max', () => {
    // Arrange
    const value = 21;
    const min = 10;
    const max = 20;

    // Act
    const result = constrainValue(value, min, max);

    expect(result).toBe(max);
  });

  it('should return value if passed value is within range', () => {
    // Arrange
    const value = 15;
    const min = 10;
    const max = 20;

    // Act
    const result = constrainValue(value, min, max);

    expect(result).toBe(value);
  });

  it('should return value if no min or max is passed', () => {
    // Arrange
    const value = 15;


    // Act
    const result = constrainValue(value);

    expect(result).toBe(value);
  });

  it('should return value if no min is passed and value is under max', () => {
    // Arrange
    const value = 15;
    const max = 20;

    // Act
    const result = constrainValue(value, undefined, max);

    expect(result).toBe(value);
  });

  it('should return value if no max is passed and value is above min', () => {
    // Arrange
    const value = 15;
    const min = 10;

    // Act
    const result = constrainValue(value, min);

    expect(result).toBe(value);
  });
});