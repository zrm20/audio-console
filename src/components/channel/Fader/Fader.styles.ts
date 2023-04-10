import { SxProps } from '@mui/material';
import { FADER_SIZE, LABEL_SIZE } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
};

export default function useStyles(size: number): Style {
  const sizeMultiplier = size / 100;

  return {
    root: {
      border: 1,
      py: 1 * sizeMultiplier,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& .p-slider': {
        height: FADER_SIZE * sizeMultiplier,
        my: 2.5 * sizeMultiplier,
      },
      '& label': {
        fontSize: LABEL_SIZE
      }
    },
  };
};
