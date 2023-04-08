/**
 * This function accepts a signal value in dB fs and gain in dB fs
 * It returns the new signal value in dB fs
 */

import { MAX_AMPLITUDE_VALUE, MIN_DBFS_VALUE } from "../../constants/audioLevels";

export default function applyGain(signal: number, gain: number): number {
  if(signal < MIN_DBFS_VALUE) {
    return MIN_DBFS_VALUE;
  };

  const newSignal = signal + gain;

  if(newSignal > 0) {
    return 0;
  };

  if(newSignal < MIN_DBFS_VALUE) {
    return MIN_DBFS_VALUE;
  };

  return newSignal;
};