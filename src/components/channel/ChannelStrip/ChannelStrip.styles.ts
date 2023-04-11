import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';
import { CHANNEL_NAME_SIZE } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
  name: CSSProperties;
  faderContainer: SxProps;
};

export default function useStyles(size: number): Style {
  const sizeMultiplier = size / 100;

  return {
    root: {
      display: 'flex',
      bgcolor: 'grey.200',
      flexDirection: 'column',
      alignItems: 'center',
      width: 100 * sizeMultiplier,
      py: 1/2,
      '& .p-divider': {
        my: 1
      }
    },
    name: {
      fontSize: CHANNEL_NAME_SIZE * sizeMultiplier,
    },
    faderContainer: {
      
    }
  };
};
