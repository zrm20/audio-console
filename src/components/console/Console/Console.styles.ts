import { SxProps } from '@mui/material';

interface Style {
  root: SxProps;
  masterSection: SxProps;
  channelContainer: SxProps;
  auxMasterContainer: SxProps;
  groupMasterContainer: SxProps;
  masterChannels: SxProps;
  globalSection: SxProps;
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
      alignItems: 'center',
      '& img': {
        width: 200
      }
    },
    masterChannels: {
      display: 'flex',
    },
    auxMasterContainer: {
      display: 'flex'
    },
    groupMasterContainer: {
      display: 'flex',
    },
    globalSection: {
      flex: 1,
      display: 'flex',
      alignItems: 'center'
    }
  };
};
