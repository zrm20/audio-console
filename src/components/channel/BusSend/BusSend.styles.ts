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
      '& .p-knob': {
        marginBottom: -1
      },
      '& label': {
        fontSize: LABEL_SIZE
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
