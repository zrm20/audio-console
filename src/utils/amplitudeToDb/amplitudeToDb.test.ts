import { MAX_AMPLITUDE_VALUE, MIN_DBFS_VALUE } from "../../constants/audioLevels";
import amplitudeToDb from "./amplitudeToDb";

describe("amplitudeToDb()", () => {
  it("should return 0 for any value above the max amplitude", () => {
    // Arrange
    const input = MAX_AMPLITUDE_VALUE + 1;

    // Act
    const result = amplitudeToDb(input);

    // Assert
    expect(result).toBe(0);
  });

  it("should calc and return 0 for max amplitude", () => {
    // Arrange
    const input = MAX_AMPLITUDE_VALUE;

    // Act
    const result = amplitudeToDb(input);

    // Assert
    expect(result).toBe(0);
  });

  it("should return min db value for results under minimum", () => {
    // Arrange
    const input = 1;

    // Act
    const result = amplitudeToDb(input);

    // Assert
    expect(result).toBe(MIN_DBFS_VALUE);
  });

  it("should perform correct calculation and return db value", () => {
    // Arrange
    const randomInput = Math.floor(Math.random() *(MAX_AMPLITUDE_VALUE + 1));
    const expectedResult = 20 * Math.log(randomInput / MAX_AMPLITUDE_VALUE);
    // Act
    const result = amplitudeToDb(randomInput);

    // Assert
    expect(result).toBe(expectedResult);
  });
});