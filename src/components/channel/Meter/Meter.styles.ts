import { SxProps } from '@mui/material';
import { METER_SIZE, METER_THICKNESS } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
  meterContainer: SxProps;
};

export default function useStyles(size: number): Style {
  const sizeMultiplier = size / 100;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 1 * sizeMultiplier,
      '& label': {
        fontSize: 12 * sizeMultiplier
      },
    },
    meterContainer: {
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
        width: METER_SIZE * sizeMultiplier,
        height: METER_THICKNESS * sizeMultiplier,
        p: 0,
        m: 0
      }
    }
  };
};
