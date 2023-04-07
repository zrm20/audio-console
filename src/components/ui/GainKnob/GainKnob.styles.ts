import { SxProps } from '@mui/material';

interface Style {
  root: SxProps;
};

export default function useStyles(size: number): Style {
  return {
    root: {
      '& .p-knob': {
        marginBottom: -1.5
      },
      '& span': {
        fontSize: 10 * (size / 50)
      }
    },
  };
};
