/**
 * @param dbLevel A dB fs level from DBFS_MIN (often -96) to 0
 * @returns A number between 1 and 100 to represent percentage of dB fs level.
 */

import { MIN_DBFS_VALUE } from "../../constants/audioLevels";

export default function convertDbToPercentage(dbLevel: number): number {
  if(dbLevel > 0) {
    return 100;
  };

  if(dbLevel <= MIN_DBFS_VALUE) {
    return 0;
  };
  
  // determine the upper positive limit of dBfs
  const upperLimit = Math.abs(MIN_DBFS_VALUE);

  // shift the value into positive range;
  const positiveValue = dbLevel - MIN_DBFS_VALUE;

  // represent the positive value as a percentage of scale
  const percentageValue = (positiveValue / upperLimit) * 100;

  return percentageValue;
};
