/**
 * @param signals An array of dBfs values or objects with a value property
 * A number in dBfs
 * This function accepts an array of dBfs values, converts them to amplitude, sums them and converts back to dBfs
 */

import { MIN_DBFS_VALUE } from "../../constants/audioLevels";

export default function sumSignals(signals: number[] | ChannelGroupOutput[]): number {
  if (signals.length === 0) {
    return MIN_DBFS_VALUE;
  };

  let linearValues: number[];
  if (typeof signals[0] === 'number') {
    // obtain the amplitude (linear audio value)
    linearValues = signals.map(el => Math.pow(10, el as number / 20))
  } else {
    linearValues = signals.map(el => {
      // obtain the amplitude (linear audio value)
      const { value } = el as ChannelGroupOutput;
      return Math.pow(10, value / 20);
    });
  };

  // sum all amplitude values
  const summedAmplitude = linearValues.reduce((tot, curr, i) => {
    return (tot + curr)
  }, 0);


  // amplitude represented by dBfs
  const totalDb = 20 * Math.log10(summedAmplitude);
  return Math.round(totalDb);
};