import { SxProps } from '@mui/material';
import { LABEL_SIZE } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
};

export default function useStyles(): Style {

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& .p-slider': {
        height: 200
      },
      '& label': {
        fontSize: LABEL_SIZE
      }
    },
  };
};
