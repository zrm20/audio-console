import { MAX_AMPLITUDE_VALUE, MIN_DBFS_VALUE } from "../../constants/audioLevels";

export default function applyDbGainToAmplitude(amplitude: number, dbGain: number): number {
  const gainMultiplier = Math.pow(10, dbGain / 20);

  const newAudioSignal = amplitude * gainMultiplier;

  if(newAudioSignal > MAX_AMPLITUDE_VALUE) {
    return MAX_AMPLITUDE_VALUE;
  };

  if(newAudioSignal < 1) {
    return 0;
  };

  return newAudioSignal;
};