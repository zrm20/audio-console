import { SxProps } from '@mui/material';
import { LABEL_SIZE } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
};

export default function useStyles(size: number): Style {
  const sizeMultiplier = size / 100;
  return {
    root: {
      '& .p-knob': {
        marginBottom: -1.5
      },
      '& label': {
        fontSize: LABEL_SIZE * sizeMultiplier
      }
    },
  };
};
