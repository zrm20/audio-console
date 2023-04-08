export const BIT_DEPTH = 16;

// Max audio value is divided by 2 to only use positive value
export const MAX_AMPLITUDE_VALUE = Math.pow(2, BIT_DEPTH) / 2;

// Min dBfs value can be anything but -96 is a standard in digital audio
export const MIN_DBFS_VALUE = -96;


