import { SxProps } from '@mui/material';
import { FADER_SIZE, LABEL_SIZE } from '../../../constants/primeReactSizes';

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
        height: FADER_SIZE
      },
      '& label': {
        fontSize: LABEL_SIZE
      }
    },
  };
};
