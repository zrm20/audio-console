import { SxProps } from '@mui/material';
import { LABEL_SIZE } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
};

export default function useStyles(size: number): Style {
  const sizeMultiplier = size / 100;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      my: 1/2,
      '& .p-knob': {
        marginBottom: -1 * sizeMultiplier
      },
      '& label': {
        fontSize: LABEL_SIZE * sizeMultiplier
      },
      '& .p-togglebutton': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 30,
        py: 1 / 4,
        my: 1/4,
        '& span': {
          fontSize: 6,
        }
      }
    },
  };
};
