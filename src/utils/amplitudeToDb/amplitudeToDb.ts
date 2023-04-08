/** 
 * Accepts an amplitude value and returns the dBfs value.
*/

import { MAX_AMPLITUDE_VALUE, MIN_DBFS_VALUE } from "../../constants/audioLevels";

export default function amplitudeToDb(amplitude: number): number {
  const positiveAmplitude = Math.abs(amplitude);

  // 0 is the max level in a dB fs system.
  if(positiveAmplitude > MAX_AMPLITUDE_VALUE) {
    return 0;
  };

  const db = 20 * Math.log(positiveAmplitude / MAX_AMPLITUDE_VALUE);

  if(db < MIN_DBFS_VALUE) {
    return MIN_DBFS_VALUE;
  };

  return db;
};
