import { SxProps } from '@mui/material';
import { LABEL_SIZE } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
  container: SxProps;
};

export default function useStyles(size: number): Style {
  const sizeMultiplier = size / 100;

  return {
    root: {
      '& p': {
        fontSize: LABEL_SIZE * sizeMultiplier,
        m: 0
      },
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-evenly',
      p: 1/2,
      pb: 0,
      '& .p-button': {
        fontSize: LABEL_SIZE * sizeMultiplier,
        p: 1 / 2
      }
    }
  };
};
