import { SxProps } from '@mui/material';
import { METER_SIZE, METER_THICKNESS } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
};

export default function useStyles(size: number): Style {
  const sizeMultiplier = size / 100;

  return {
    root: {
      display: 'flex',
      my: 1 * sizeMultiplier,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      width: METER_THICKNESS * 2 * sizeMultiplier,
      height: METER_SIZE * sizeMultiplier,
      '& .p-progressbar': {
        rotate: '-90deg',
        width: METER_SIZE * .95 * sizeMultiplier,
        height: METER_THICKNESS * .9 * sizeMultiplier,
        p: 0,
        m: 0
      }
    },
  };
};
