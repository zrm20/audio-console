export default function constrainValue(value: number, min?: number, max?: number): number {
  if(min !== undefined && value < min) {
    return min;
  } else if(max !== undefined && value > max) {
    return max
  };

  return value;
};