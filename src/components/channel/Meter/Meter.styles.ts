import { SxProps } from '@mui/material';
import { METER_SIZE, METER_THICKNESS } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
};

export default function useStyles(): Style {

  return {
    root: {
      display: 'flex',
      my: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      width: METER_THICKNESS * 2,
      height: METER_SIZE,
      '& .p-progressbar': {
        rotate: '-90deg',
        width: METER_SIZE,
        height: METER_THICKNESS,
        p: 0,
        m: 0
      }
    },
  };
};
