import { SxProps } from '@mui/material';
import { LABEL_SIZE } from '../../../constants/primeReactSizes';

interface Style {
  root: SxProps;
};

export default function useStyles(): Style {

  return {
    root: {
      '& .p-togglebutton': {
        fontSize: LABEL_SIZE,
        display: 'flex',
        flexDirection: 'column',
        p: 1 / 2
      }
    },
  };
};
