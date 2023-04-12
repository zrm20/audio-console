import { SxProps } from '@mui/material';

interface Style {
  root: SxProps;
  masterSection: SxProps;
  channelContainer: SxProps;
  auxMasterContainer: SxProps;
  groupMasterContainer: SxProps;
  masterChannels: SxProps;
};

export default function useStyles(): Style {

  return {
    root: {
      p: 1 / 2,
      display: 'flex',
      bgcolor: 'grey.300',
      m: 1,
    },
    channelContainer: {
      marginRight: 1 / 2,
      p: 1 / 2,
      display: 'flex',
      flex: 1
    },
    masterSection: {
      p: 1 / 2,
      display: 'flex',
      flexDirection: 'column',
      '& img': {
        width: 200
      }
    },
    masterChannels: {
      flex: 1,
      display: 'flex',
    },
    auxMasterContainer: {
      border: 1,
      flex: 1
    },
    groupMasterContainer: {
      border: 1,
    },
  };
};
