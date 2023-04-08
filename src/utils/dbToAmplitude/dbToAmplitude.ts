/**
 * This function accepts a dBfs value and returns the audio value.
 */

import { MAX_AMPLITUDE_VALUE, MIN_DBFS_VALUE } from "../../constants/audioLevels";

export default function dbToAmplitude(dbValue: number): number {
  // 0 is the max dB fs value in a system, anything above clips
  if(dbValue > 0) {
    return MAX_AMPLITUDE_VALUE;
  };

  // Minimum dB fs value is the noise floor of the system
  if(dbValue < MIN_DBFS_VALUE) {
    return 0;
  };


  const amplitude = Math.pow(10, dbValue/ 20) * MAX_AMPLITUDE_VALUE;

  return Math.round(amplitude);
};