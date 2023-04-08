import { MAX_AMPLITUDE_VALUE, MIN_DBFS_VALUE } from "../../constants/audioLevels";
import applyDbGainToAmplitude from "./applyDbGainToAmplitude";

describe("applyDbGainToAmplitude()", () => {
  it("should return max amplitude level if gained too high", () => {
    // Arrange
    const signal = 1;
    const dbGain = 1000;

    // Act
    const result = applyDbGainToAmplitude(signal, dbGain);

    // Assert
    expect(result).toBe(MAX_AMPLITUDE_VALUE);
  });

  it("should return 0 if attenuated below 1", () => {
    // Arrange
    const signal = MAX_AMPLITUDE_VALUE;
    const dbGain = MIN_DBFS_VALUE;

    // Act
    const result = applyDbGainToAmplitude(signal, dbGain);

    // Assert
    expect(result).toBe(0);
  });

  it("should perform correct calculation", () => {
    // Arrange
    const signal = 100;
    const dbGain = 10;
    const multiplier = Math.pow(10, dbGain / 20);

    // Act
    const result = applyDbGainToAmplitude(signal, dbGain);

    // Assert
    expect(result).toBe(signal * multiplier);
  });
});