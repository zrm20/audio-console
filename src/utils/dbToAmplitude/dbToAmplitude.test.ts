import { MAX_AMPLITUDE_VALUE, MIN_DBFS_VALUE } from "../../constants/audioLevels";
import dbToAmplitude from "./dbToAmplitude";

describe("dbToAmplitude()", () => {
  it("should return max value for input over 0", () => {
    // Arrange
    const input = 1;

    // Act
    const result = dbToAmplitude(input);

    // Assert
    expect(result).toBe(MAX_AMPLITUDE_VALUE);
  });

  it("should return max value for input of 0", () => {
    // Arrange
    const input = 0;

    // Act
    const result = dbToAmplitude(input);

    // Assert
    expect(result).toBe(MAX_AMPLITUDE_VALUE);
  });

  it("should return 0 for input under minimum dbLevel", () => {
    // Arrange
    const input = MIN_DBFS_VALUE - 1;

    // Act
    const result = dbToAmplitude(input);

    // Assert
    expect(result).toBe(0);
  });

  it("should perform correct calculation and return result", () => {
    // Arrange
    const randomInput = Math.floor(Math.random() * (MIN_DBFS_VALUE + 1));
    const expectedCalculation = Math.pow(10, randomInput/ 20) * MAX_AMPLITUDE_VALUE;
    const expectedResult = Math.round(expectedCalculation);
    
    // Act
    const result = dbToAmplitude(randomInput);

    // Assert
    expect(result).toBe(expectedResult);
  });
});