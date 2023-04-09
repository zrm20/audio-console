import { MIN_DBFS_VALUE } from "../../constants/audioLevels";
import convertDbToPercentage from "./convertDbToPercentage";

describe("convertDbToPercentage()", () => {
  it("should return 100 for value over 0", () => {
    // Arrange
    const input = 1;

    // Act
    const result = convertDbToPercentage(input);

    // Assert
    expect(result).toBe(100);
  });

  it("should return 100 for value over 0", () => {
    // Arrange
    const input = 0;

    // Act
    const result = convertDbToPercentage(input);

    // Assert
    expect(result).toBe(100);
  });

  it("should return 0 for value under MIN_DBFS", () => {
    // Arrange
    const input = MIN_DBFS_VALUE - 1;

    // Act
    const result = convertDbToPercentage(input);

    // Assert
    expect(result).toBe(0);
  });

  it("should return 0 for value equal to MIN_DBFS", () => {
    // Arrange
    const input = MIN_DBFS_VALUE;

    // Act
    const result = convertDbToPercentage(input);

    // Assert
    expect(result).toBe(0);
  });

  it("should return correct percentage for value of dBfs scale", () => {
    // Arrange
    const input = MIN_DBFS_VALUE / 2;

    // Act
    const result = convertDbToPercentage(input);

    // Assert
    expect(result).toBe(50);
  });
});