import { SxProps } from '@mui/material';
import { LABEL_SIZE } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
};

export default function useStyles(size: number): Style {
  const sizeMultiplier = size / 100;

  return {
    root: {
      '& .p-button': {
        p: 1,
      },
      '& .p-button-label': {
        fontSize: LABEL_SIZE * sizeMultiplier,
      }
    },
  };
};
