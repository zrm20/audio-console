import { MIN_DBFS_VALUE } from "../../constants/audioLevels";
import sumSignals from "./sumSignals";

describe('sumSignals()', () => {
  it('should return MIN_DBFS if empty array is passed', () => {
    // Arrange
    const numInput: number[] = [];
    const objInput: ChannelGroupOutput[] = [];

    // Act
    const numResult = sumSignals(numInput);
    const objResult = sumSignals(objInput);

    // Assert
    expect(numResult).toBe(MIN_DBFS_VALUE);
    expect(objResult).toBe(MIN_DBFS_VALUE);
  });

  it('should sum the signals within +/-1dB', () => {
    // Arrange
    const inputVal = -24;
    const expectedSum = inputVal + 6;
    const numInput: number[] = [inputVal, inputVal];
    const objInput: ChannelGroupOutput[] = [
      { id: '1', value: inputVal },
      { id: '2', value: inputVal },
    ];

    // Act
    const numResult = sumSignals(numInput);
    const objResult = sumSignals(objInput);

    // Assert
    expect(Math.round(numResult)).toBe(expectedSum);
    expect(Math.round(objResult)).toBe(expectedSum);
  });
});