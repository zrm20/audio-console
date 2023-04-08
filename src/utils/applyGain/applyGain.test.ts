import { MIN_DBFS_VALUE } from "../../constants/audioLevels";
import applyGain from "./applyGain";

describe("applyGain()", () => {
  it("should return max audio value when amplified too high", () => {
    // Arrange
    const signal = -10;
    const db = 11;

    // Act
    const result = applyGain(signal, db);

    // Assert
    expect(result).toBe(0);
  });

  it("should return minimum db value if input is under min dB fs level", () => {
    // Arrange
    const signal = MIN_DBFS_VALUE - 1;
    const db = 11;

    // Act
    const result = applyGain(signal, db);

    // Assert
    expect(result).toBe(MIN_DBFS_VALUE);
  });


  it("should add values", () => {
    // Arrange
    const signal = -10
    const db = 5;

    // Act
    const result = applyGain(signal, db);

    // Assert
    expect(result).toBe(signal + db);
  });
});